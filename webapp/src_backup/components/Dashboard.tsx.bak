import React, { useState } from "react";

export default function Dashboard({ onCreate }: any) {
  const [price, setPrice] = useState<string>("0.01");
  const [cid, setCid] = useState<string>("");

  async function submit(e: any) {
    e?.preventDefault();
    if (!onCreate) return;
    await onCreate(price, cid);
  }

  return (
    <section className="aur-dashboard">
      <div className="aur-panel">
        <h2 className="aur-heading">Consumer — Create Task</h2>

        <form onSubmit={submit} className="aur-form">
          <label className="aur-label">
            <span className="aur-label-text">Price (ETH):</span>
            <input
              className="aur-input"
              type="number"
              step="0.001"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label className="aur-label">
            <span className="aur-label-text">Dataset CID:</span>
            <input
              className="aur-input"
              type="text"
              placeholder="bafy..."
              value={cid}
              onChange={(e) => setCid(e.target.value)}
            />
          </label>

          <div className="aur-form-row">
            <button className="aur-btn aur-btn-primary" type="submit">Create Task</button>
          </div>
        </form>
      </div>
    </section>
  );
}
