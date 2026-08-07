import http from 'node:http';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {offers,recommendOffers} from './offers.mjs';

const appDir=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(appDir,'../..');
const publicDir=path.join(appDir,'public');
const dataFile=process.env.FACTORY_V4_DATA_FILE||path.join(appDir,'data','workspaces.json');
const host=process.env.HOST||'127.0.0.1';
const port=Number(process.env.PORT||4180);
const runtimeUrl=String(process.env.FACTORY_WORKFLOW_RUNTIME_URL||'').replace(/\/$/,'');
const runtimeToken=String(process.env.FACTORY_WORKFLOW_RUNTIME_TOKEN||'');
const demo=process.env.FACTORY_V4_MODE!=='connected';
const MAX_BODY=256*1024;

const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
const securityHeaders={'x-content-type-options':'nosniff','x-frame-options':'DENY','referrer-policy':'no-referrer','permissions-policy':'camera=(), microphone=(), geolocation=()','content-security-policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'"};
let workspaces=await loadWorkspaces();

async function loadWorkspaces(){try{return JSON.parse(await readFile(dataFile,'utf8'));}catch{return {};}}
async function saveWorkspaces(){await mkdir(path.dirname(dataFile),{recursive:true});const tmp=`${dataFile}.${process.pid}.tmp`;await writeFile(tmp,JSON.stringify(workspaces,null,2));await rename(tmp,dataFile);}
function id(prefix){return `${prefix}_${crypto.randomBytes(8).toString('hex')}`;}
function keyHash(key){return crypto.createHash('sha256').update(key).digest('hex');}
function json(res,status,payload){res.writeHead(status,{...securityHeaders,'content-type':'application/json; charset=utf-8','cache-control':'no-store'});res.end(JSON.stringify(payload));}
async function body(req){let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>MAX_BODY)throw Object.assign(new Error('Request too large'),{status:413});chunks.push(chunk);}if(!chunks.length)return {};try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw Object.assign(new Error('Invalid JSON'),{status:400});}}
async function loadChunked(kind){const dir=path.join(repoRoot,'external',kind);const index=JSON.parse(await readFile(path.join(dir,'index.json'),'utf8'));const parts=await Promise.all(index.parts.map(p=>readFile(path.join(dir,p),'utf8').then(JSON.parse)));return {index,items:parts.flat()};}
async function portfolio(){const [workflows,agents]=await Promise.all([loadChunked('workflows'),loadChunked('agents')]);return {workflows,agents,assets:[...workflows.items,...agents.items]};}
function authWorkspace(req,workspace){const key=String(req.headers['x-workspace-key']||'');return key&&crypto.timingSafeEqual(Buffer.from(keyHash(key)),Buffer.from(workspace.keyHash));}
function readiness(w){const required=['company','owner','approver','goal'];const missing=required.filter(k=>!w[k]);const offer=offers.find(o=>o.id===w.offerId);const missingConnections=(offer?.required||[]).filter(x=>!w.connections?.includes(x));return {score:Math.max(0,100-(missing.length+missingConnections.length)*20),ready:missing.length===0&&missingConnections.length===0,missing,missingConnections};}
async function launch(workspace){const offer=offers.find(o=>o.id===workspace.offerId);const p=await portfolio();const candidates=p.workflows.items.filter(x=>offer.workflowHints.some(h=>`${x.name||''} ${x.category||''} ${x.id||''}`.toLowerCase().includes(h))).slice(0,6);const starter=candidates[0]||p.workflows.items[0];if(!starter)throw Object.assign(new Error('No workflow available'),{status:409});if(demo||!runtimeUrl){return {mode:'proof',status:'completed',workflow:{id:starter.id,name:starter.name},summary:`${offer.name} proof launch completed without external side effects.`,evidence:candidates.slice(0,3).map(x=>({id:x.id,name:x.name})),approvalRequired:true};}
 const r=await fetch(`${runtimeUrl}/api/workflows/${encodeURIComponent(starter.id)}/run`,{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${runtimeToken}`,'idempotency-key':id('pilot')},body:JSON.stringify({approved:false,live:false,input:{goal:workspace.goal,company:workspace.company}}),redirect:'error',signal:AbortSignal.timeout(15000)});const payload=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(new Error(payload.error||`Runtime returned ${r.status}`),{status:502});return {mode:'connected',status:payload.status||'submitted',workflow:{id:starter.id,name:starter.name},runtime:payload,approvalRequired:true};}

async function api(req,res,url){
 if(req.method==='GET'&&url.pathname==='/api/health')return json(res,200,{ok:true,version:'4.0.0',mode:demo?'demo':'connected'});
 if(req.method==='GET'&&url.pathname==='/api/offers')return json(res,200,{offers});
 if(req.method==='GET'&&url.pathname==='/api/catalog'){const p=await portfolio();const q=(url.searchParams.get('q')||'').toLowerCase();const type=url.searchParams.get('type')||'all';let items=p.assets;if(type!=='all')items=items.filter(x=>(x.kind||x.type)===type);if(q)items=items.filter(x=>JSON.stringify(x).toLowerCase().includes(q));return json(res,200,{counts:{workflows:p.workflows.index.count,agents:p.agents.index.count,total:p.workflows.index.count+p.agents.index.count},items:items.slice(0,100)});}
 if(req.method==='POST'&&url.pathname==='/api/recommend'){const b=await body(req);return json(res,200,{recommendations:recommendOffers([b.goal,b.problem,b.team,b.industry].filter(Boolean).join(' '))});}
 if(req.method==='POST'&&url.pathname==='/api/workspaces'){const b=await body(req);if(!offers.some(o=>o.id===b.offerId))return json(res,400,{error:'Unknown offer'});const accessKey=crypto.randomBytes(24).toString('base64url');const workspace={id:id('ws'),offerId:b.offerId,company:String(b.company||'').slice(0,120),owner:String(b.owner||'').slice(0,120),approver:String(b.approver||'').slice(0,120),goal:String(b.goal||'').slice(0,500),connections:Array.isArray(b.connections)?b.connections.slice(0,20):[],keyHash:keyHash(accessKey),createdAt:new Date().toISOString(),runs:[]};workspaces[workspace.id]=workspace;await saveWorkspaces();return json(res,201,{workspace:{...workspace,keyHash:undefined},accessKey,readiness:readiness(workspace)});}
 const match=url.pathname.match(/^\/api\/workspaces\/([^/]+)(?:\/(launch))?$/);if(match){const w=workspaces[match[1]];if(!w)return json(res,404,{error:'Workspace not found'});if(!authWorkspace(req,w))return json(res,401,{error:'Workspace key required'});if(req.method==='GET'&&!match[2])return json(res,200,{workspace:{...w,keyHash:undefined},readiness:readiness(w)});if(req.method==='POST'&&match[2]==='launch'){const r=readiness(w);if(!r.ready)return json(res,409,{error:'Workspace is not ready',readiness:r});const run={id:id('run'),createdAt:new Date().toISOString(),...(await launch(w))};w.runs.unshift(run);await saveWorkspaces();return json(res,201,{run});}}
 return false;
}
async function staticFile(res,url){let pathname=url.pathname==='/'?'/index.html':url.pathname;if(pathname.includes('..'))return json(res,400,{error:'Invalid path'});const file=path.join(publicDir,pathname);if(!file.startsWith(publicDir))return json(res,400,{error:'Invalid path'});try{const content=await readFile(file);res.writeHead(200,{...securityHeaders,'content-type':MIME[path.extname(file)]||'application/octet-stream'});res.end(content);}catch{return json(res,404,{error:'Not found'});}}
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);if(url.pathname.startsWith('/api/')){const handled=await api(req,res,url);if(handled===false)return json(res,404,{error:'API route not found'});return;}await staticFile(res,url);}catch(err){json(res,err.status||500,{error:err.message||'Internal error'});}});
server.listen(port,host,()=>console.log(`Syrava Factory v4 on http://${host}:${port} (${demo?'demo':'connected'})`));
