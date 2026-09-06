import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const statusOrder = ["new", "researching", "blocked", "ready", "submitted"];

export default function App() {
  const rows = useQuery(api.opportunities.list) ?? [];
  const create = useMutation(api.opportunities.create);
  const setStatus = useMutation(api.opportunities.setStatus);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  async function add(e) {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    await create({ name: name.trim(), officialUrl: url.trim() });
    setName("");
    setUrl("");
  }

  return (
    <main style={{ maxWidth: 980, margin: "40px auto", fontFamily: "system-ui", padding: 20 }}>
      <p style={{ textTransform: "uppercase", letterSpacing: 2 }}>All Gas Hackathon Build</p>
      <h1>GrantPulse</h1>
      <p>Realtime funding opportunities, blockers, and truthful submission readiness.</p>

      <form onSubmit={add} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 8, margin: "28px 0" }}>
        <input aria-label="Program name" placeholder="Program name" value={name} onChange={(e) => setName(e.target.value)} />
        <input aria-label="Official URL" placeholder="Official URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button>Add</button>
      </form>

      <section style={{ display: "grid", gap: 12 }}>
        {rows.map((row) => (
          <article key={row._id} style={{ border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
            <strong>{row.name}</strong>
            <div><a href={row.officialUrl} target="_blank" rel="noreferrer">official source</a></div>
            <small>{row.sourceVerified ? "source verified" : "source not yet verified"}</small>
            {row.blocker && <p>Blocker: {row.blocker}</p>}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
              {statusOrder.map((status) => (
                <button
                  key={status}
                  disabled={row.status === status}
                  onClick={() => setStatus({ id: row._id, status })}
                >
                  {status}
                </button>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
