import axios from "axios";
export const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5001",
  timeout: 15000,
});

export async function getHealth(){ const {data} = await API.get("/health"); return data; }
export async function listTasks(){ const {data} = await API.get("/tasks"); return Array.isArray(data) ? data : data?.value ?? []; }
export async function getBalance(addr: string){ const {data} = await API.get(`/balances/${addr}`); return data; }
export async function createTask(price: string, datasetCID: string, deadline: number){ const {data} = await API.post("/tasks", { price, datasetCID, deadline }); return data; }
export async function acceptTask(id: number){ const {data} = await API.post(`/tasks/${id}/accept`); return data; }
export async function startTask(id: number){ const {data} = await API.post(`/tasks/${id}/start`); return data; }
export async function submitTask(id: number, resultCID: string){ const {data} = await API.post(`/tasks/${id}/submit`, { resultCID }); return data; }
export async function verifyTask(id: number, ok: boolean){ const {data} = await API.post(`/tasks/${id}/verify`, { ok }); return data; }
