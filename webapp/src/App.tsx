import React, { useEffect, useState } from "react";
import client from "./api/client";
import "./index.css";

type Task = {
  id: number;
  consumer: string;
  provider?: string | null;
  dataset: string;
  price: string;
  status?: string;
  result?: string | null;
};

const short = (a?: string) => a ? `${a.slice(0,6)}...${a.slice(-4)}` : "";

export default function App(): JSX.Element {
  const [health, setHealth] = useState<any | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);
  const [dataset, setDataset] = useState<string>("ipfs://dataset-abc");
  const [price, setPrice] = useState<string>("0.01");
  const [walletAddr, setWalletAddr] = useState<string | null>(null);
  const [toast, setToast] = useState<{type:"ok"|"err", text:string}|null>(null);

  async function fetchHealth() {
    try {
      const res = await client.get("/health");
      setHealth(res.data);
      setToast(null);
    } catch (e) {
      console.error("health error", e);
      setHealth(null);
      setToast({type:"err", text:"Could not reach backend /health — check backend (127.0.0.1:5001)."});
    }
  }

  async function fetchTasks() {
    try {
      const res = await client.get("/tasks");
      const arr = Array.isArray(res.data) ? res.data : [];
      setTasks(arr);
    } catch (e) {
      console.error("tasks error", e);
      setTasks([]);
      setToast({type:"err", text:"Failed to fetch /tasks."});
    }
  }

  async function loadAll() {
    setLoading(true);
    await Promise.all([fetchHealth(), fetchTasks()]);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
    if ((window as any).ethereum) {
      (window as any).ethereum.request({ method: "eth_accounts" }).then((accs: string[]) => {
        if (accs?.length) setWalletAddr(accs[0]);
      }).catch(()=>{});
      (window as any).ethereum?.on?.("accountsChanged", (accs: string[]) => setWalletAddr(accs?.[0] ?? null));
    }
  }, []);

  async function connectWallet() {
    try {
      if (!(window as any).ethereum) { alert("No injected wallet found (Metamask)."); return; }
      const accs = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddr(accs?.[0] ?? null);
    } catch (e) { console.error("connectWallet", e); }
  }

  async function createTaskTest() {
    setCreating(true);
    setToast(null);
    try {
      const resp = await client.post("/tasks", { dataset, price });
      await fetchTasks();
      const latest = tasks.length ? tasks[tasks.length - 1]?.id ?? null : null;
      if (resp?.data?.id || resp?.data?.ID) {
        setToast({type:"ok", text:`Task created — id ${resp.data.id ?? resp.data.ID}`});
      } else {
        // compute latest from updated fetch
        const res = await client.get("/tasks");
        const arr = Array.isArray(res.data) ? res.data : [];
        const lastId = arr.length ? arr[arr.length-1].id ?? arr[arr.length-1].ID ?? null : null;
        setToast({type:"ok", text: lastId ? `Task created — latest id ${lastId}` : "Task created — id unknown, but tasks refreshed."});
      }
    } catch (e) {
      console.error("createTaskTest error:", e);
      setToast({type:"err", text:"Failed to create task. Check backend & contracts. See console."});
    } finally {
      setCreating(false);
      // auto-hide toast after 4s
      setTimeout(()=>setToast(null), 4000);
    }
  }

  return (
    <div className="app polished-ui">
      <header className="topbar">
        <div className="brand">
          <div className="logo">A</div>
          <div>
            <div className="brand-title">AUREON Protocol</div>
            <div className="brand-sub">Decentralized Compute Economy</div>
          </div>
        </div>

        <div className="top-actions">
          <div className="task-count">Tasks <span>{tasks.length}</span></div>
          <div className="addr-pill">{walletAddr ? short(walletAddr) : "No wallet"}</div>
          <button className="btn btn-primary" onClick={connectWallet}>
            {walletAddr ? "Wallet Connected" : "Connect Wallet"}
          </button>
        </div>
      </header>

      <main className="main-grid">
        <section className="card card-left">
          <h3>Backend / Blockchain Status</h3>
          {loading ? <div className="muted">Loading backend status…</div> : null}

          {health ? (
            <pre className="code">{JSON.stringify(health, null, 2)}</pre>
          ) : (
            <div className="error">{toast?.text ?? "No health data"}</div>
          )}
        </section>

        <section className="card card-right">
          <h3>Create Task (test)</h3>

          <div className="form-row">
            <label>Price (ETH)</label>
            <input value={price} onChange={e=>setPrice(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Dataset CID</label>
            <input value={dataset} onChange={e=>setDataset(e.target.value)} />
          </div>

          <div className="actions-row">
            <button className="btn btn-primary" onClick={createTaskTest} disabled={creating}>
              {creating ? "Creating…" : "Create task (test)"}
            </button>
            <button className="btn btn-ghost" onClick={loadAll}>Refresh</button>
          </div>

          {toast && (
            <div className={`toast ${toast.type === "err" ? "toast-err" : "toast-ok"}`}>
              {toast.text}
            </div>
          )}

          <h4 style={{marginTop:18}}>Recent Tasks</h4>

          <div className="task-list">
            {tasks.length === 0 && <div className="muted">No tasks yet</div>}
            {tasks.map((t: Task) => (
              <article key={t.id ?? `${t.dataset}-${Math.random()}`} className="task-card">
                <div className="task-head">
                  <div className="task-id">#{t.id}</div>
                  <div className={`badge ${t.status?.toLowerCase() === "verified" ? "ok" : "pending"}`}>
                    {t.status ?? "Unknown"}
                  </div>
                </div>

                <div className="task-body">
                  <div className="line"><strong>Dataset:</strong> <span className="mono">{t.dataset}</span></div>
                  <div className="line"><strong>Price:</strong> { (Number(t.price) > 1e6) ? (Number(t.price)/1e18)+" ETH" : t.price }</div>
                  <div className="line small"><strong>Consumer:</strong> {short(t.consumer)} <strong style={{marginLeft:12}}>Provider:</strong> {t.provider ? short(t.provider) : "—"}</div>
                  {t.result && <div className="line small"><strong>Result:</strong> <span className="mono">{t.result}</span></div>}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">Made with <span style={{color:"#ff6b6b"}}>❤</span> by Pushkar</footer>
    </div>
  );
}
