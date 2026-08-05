const state={assets:[],kind:'all',query:'',tour:'agency',step:0};
const tours={
  agency:{name:'Agency Margin Guard',buyer:'Creative, development and consulting agencies',stages:[
    ['Signal captured','A client asks for an additional redesign after the approved revision limit.'],
    ['Evidence connected','The signed scope and acceptance ledger confirm both included revision rounds were used.'],
    ['Human decision','The account owner chooses a change order, goodwill exception, or decline path.'],
    ['Handoff prepared','A cited review packet is prepared. No customer message or project change is sent automatically.']
  ]},
  revenue:{name:'Revenue Rescue Brief',buyer:'B2B SaaS and professional-services teams',stages:[
    ['Signal captured','A strategic opportunity has no buyer response after security review.'],
    ['Evidence connected','Two security questions remain open and the original champion changed roles.'],
    ['Human decision','The seller reviews a minimum recovery path without an automatic discount or promise.'],
    ['Handoff prepared','A cited one-page brief is ready. No CRM edit or buyer contact occurs automatically.']
  ]},
  owner:{name:'Owner Command Center',buyer:'Local businesses and owner-operated teams',stages:[
    ['Signal captured','A customer deadline, supplier change, and insurance renewal arrive in one morning.'],
    ['Evidence connected','Each message is connected to the relevant contract, calendar, and owner.'],
    ['Human decision','The owner approves one follow-up, delegates one task, and opens one comparison.'],
    ['Handoff prepared','The weekly exception brief is updated. No email, payment, or filing is submitted automatically.']
  ]}
};

async function loadChunked(directory){
  const index=await fetch(`./data/${directory}/index.json`).then(r=>r.json());
  const parts=await Promise.all(index.parts.map(part=>fetch(`./data/${directory}/${part}`).then(r=>r.json())));
  return {...index,items:parts.flat()};
}

async function loadData(){
  const [workflows,agents,expansion]=await Promise.all([
    loadChunked('workflows'),
    loadChunked('agents'),
    loadChunked('expansion')
  ]);
  state.assets=[...workflows.items.map(item=>({...item,source:workflows.source})),...agents.items.map(item=>({...item,source:agents.source}))];
  renderCatalog();
  renderSectors(expansion.items);
}

function renderCatalog(){
  const normalized=state.query.trim().toLowerCase();
  const matches=state.assets.filter(asset=>{
    const kindMatches=state.kind==='all'||asset.kind===state.kind;
    const text=[asset.name,asset.category,asset.group,asset.buyer,asset.risk].filter(Boolean).join(' ').toLowerCase();
    return kindMatches&&(!normalized||text.includes(normalized));
  });
  document.querySelector('#match-count').textContent=`${matches.length} matches`;
  const grid=document.querySelector('#catalog-grid');
  grid.innerHTML=matches.slice(0,60).map(asset=>`<article class="catalog-card">
    <div class="card-top"><span class="type">${escapeHtml(asset.kind)}</span><span class="risk">${escapeHtml(asset.risk)}</span></div>
    <h3>${escapeHtml(asset.name)}</h3><p>${escapeHtml(asset.category||asset.group||'')}</p>
    <div class="card-bottom"><span>${escapeHtml(asset.status)}</span><a class="source-link" href="${asset.source.url}" target="_blank" rel="noreferrer">Source ↗</a></div>
  </article>`).join('');
  document.querySelector('#catalog-note').textContent=matches.length>60?'Showing the first 60 matches. Narrow your search to find a specific asset.':'';
}

function renderSectors(sectors){
  document.querySelector('#sector-grid').innerHTML=sectors.map(sector=>`<article>
    <span class="type">${escapeHtml(sector.risk)}</span><h3>${escapeHtml(sector.name)}</h3>
    <p>${sector.plannedWorkflows} workflows · ${sector.plannedAgents} agents<br>${escapeHtml(sector.voiceFit)}</p>
  </article>`).join('');
}

function renderTours(){
  const cards=document.querySelector('#tour-cards');
  cards.innerHTML=Object.entries(tours).map(([key,tour])=>`<button class="tour-card ${state.tour===key?'active':''}" data-tour="${key}">
    <strong>${escapeHtml(tour.name)}</strong><span>${escapeHtml(tour.buyer)}</span><em>${state.tour===key?'Viewing tour':'Open tour'} →</em>
  </button>`).join('');
  cards.querySelectorAll('[data-tour]').forEach(button=>button.addEventListener('click',()=>openTour(button.dataset.tour,true)));

  const tour=tours[state.tour];
  document.querySelector('#tour-title').textContent=tour.name;
  document.querySelector('#tour-buyer').textContent=tour.buyer;
  const stageContainer=document.querySelector('#tour-stages');
  stageContainer.innerHTML=tour.stages.map(([title],index)=>`<button class="stage-button ${state.step===index?'active':''}" data-step="${index}"><span>${index+1}</span>${escapeHtml(title)}</button>`).join('');
  stageContainer.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{state.step=Number(button.dataset.step);renderTours();}));
  document.querySelector('#tour-stage-title').textContent=tour.stages[state.step][0];
  document.querySelector('#tour-stage-copy').textContent=tour.stages[state.step][1];
}

function openTour(key,focusViewer){
  state.tour=key;state.step=0;
  history.replaceState(null,'',`#demo-${key}`);
  renderTours();
  if(focusViewer){
    const viewer=document.querySelector('#tour-viewer');
    viewer.scrollIntoView({behavior:'smooth',block:'start'});
    viewer.focus({preventScroll:true});
  }
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}

document.querySelector('#search').addEventListener('input',event=>{state.query=event.target.value;renderCatalog();});
document.querySelectorAll('[data-kind]').forEach(button=>button.addEventListener('click',()=>{
  state.kind=button.dataset.kind;
  document.querySelectorAll('[data-kind]').forEach(item=>item.classList.toggle('active',item===button));
  renderCatalog();
}));
document.querySelector('#menu-button').addEventListener('click',()=>{
  const nav=document.querySelector('#nav');
  const open=nav.classList.toggle('open');
  document.querySelector('#menu-button').setAttribute('aria-expanded',String(open));
});
const hashTour=location.hash.startsWith('#demo-')?location.hash.replace('#demo-',''):null;
if(hashTour&&tours[hashTour])state.tour=hashTour;
renderTours();
loadData().catch(error=>{
  console.error(error);
  document.querySelector('#catalog-grid').innerHTML='<p>Catalog data could not be loaded.</p>';
});
