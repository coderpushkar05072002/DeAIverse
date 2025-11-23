import { createPublicClient, http, formatEther } from "viem";
import { hardhat } from "wagmi/chains";
import { writeContract, waitForTransactionReceipt, getAccount } from "wagmi/actions";
import { config } from "./wallet";
import { MARKET_ADDR, TOKEN_ADDR, DeaiTokenAbi, ComputeMarketAbi, STATUS, RPC_URL } from "./contracts";

export type Task = {
  id: bigint;
  consumer: `0x${string}`;
  provider: `0x${string}`;
  price: bigint;
  status: number;
  statusName: string;
  datasetCID: string;
  resultCID: string;
  deadline: bigint;
};

const client = createPublicClient({ chain: hardhat, transport: http(RPC_URL) });

export async function listTasksOnChain(): Promise<Task[]> {
  const nextId: bigint = await client.readContract({
    address: MARKET_ADDR as `0x${string}`,
    abi: ComputeMarketAbi,
    functionName: "nextTaskId",
  });
  const max = Number(nextId);
  const items: Task[] = [];
  for (let i = 1; i <= max; i++) {
    const t = await client.readContract({
      address: MARKET_ADDR as `0x${string}`,
      abi: ComputeMarketAbi,
      functionName: "tasks",
      args: [BigInt(i)],
    });
    const task: Task = {
      id: t[0] as bigint,
      consumer: t[1] as `0x${string}`,
      provider: t[2] as `0x${string}`,
      price: t[3] as bigint,
      status: Number(t[4]),
      statusName: STATUS[Number(t[4])] as string,
      datasetCID: t[5] as string,
      resultCID: t[6] as string,
      deadline: t[7] as bigint,
    };
    // Skip empty default (id==0) if any
    if (task.id !== 0n) items.push(task);
  }
  return items;
}

export async function approveOnChain(spender = MARKET_ADDR, amountWei: string) {
  const tx = await writeContract(config, {
    abi: DeaiTokenAbi,
    address: TOKEN_ADDR as `0x${string}`,
    functionName: "approve",
    args: [spender as `0x${string}`, BigInt(amountWei)],
  });
  await waitForTransactionReceipt(config, { hash: tx });
  return tx;
}

export async function createTaskOnChain(priceWei: string, datasetCID: string, deadline: number) {
  const tx = await writeContract(config, {
    abi: ComputeMarketAbi,
    address: MARKET_ADDR as `0x${string}`,
    functionName: "createTask",
    args: [BigInt(priceWei), datasetCID, BigInt(deadline || 0)],
  });
  await waitForTransactionReceipt(config, { hash: tx });
  return tx;
}

export async function acceptTaskOnChain(id: number) {
  const tx = await writeContract(config, {
    abi: ComputeMarketAbi, address: MARKET_ADDR as `0x${string}`,
    functionName: "acceptTask", args: [BigInt(id)]
  });
  await waitForTransactionReceipt(config, { hash: tx }); return tx;
}
export async function startTaskOnChain(id: number) {
  const tx = await writeContract(config, {
    abi: ComputeMarketAbi, address: MARKET_ADDR as `0x${string}`,
    functionName: "startTask", args: [BigInt(id)]
  });
  await waitForTransactionReceipt(config, { hash: tx }); return tx;
}
export async function submitResultOnChain(id: number, cid: string) {
  const tx = await writeContract(config, {
    abi: ComputeMarketAbi, address: MARKET_ADDR as `0x${string}`,
    functionName: "submitResult", args: [BigInt(id), cid]
  });
  await waitForTransactionReceipt(config, { hash: tx }); return tx;
}
export async function verifyAndReleaseOnChain(id: number, ok = true) {
  const tx = await writeContract(config, {
    abi: ComputeMarketAbi, address: MARKET_ADDR as `0x${string}`,
    functionName: "verifyAndRelease", args: [BigInt(id), ok]
  });
  await waitForTransactionReceipt(config, { hash: tx }); return tx;
}

export async function whoAmI() {
  try { return getAccount(config).address; } catch { return undefined; }
}
