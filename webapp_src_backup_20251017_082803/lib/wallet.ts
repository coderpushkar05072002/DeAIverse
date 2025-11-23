import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createConfig } from "wagmi";
import { hardhat } from "wagmi/chains";

// Use viem to create the public client (avoids wagmi/providers deep imports)
import { createPublicClient, http } from "viem";

const rpcUrl = (import.meta.env.VITE_RPC_URL as string) || "http://127.0.0.1:8545";

// Use the hardhat chain for local dev
export const chains = [hardhat];

// create a viem public client pointed at the RPC URL
export const publicClient = createPublicClient({
  transport: http(rpcUrl),
  chain: hardhat,
});

// default wallets helper from RainbowKit
const { connectors } = getDefaultWallets({
  appName: "DeAI Verse",
  projectId: "deai-verse-demo",
  chains,
});

// Create wagmi config object using the publicClient we made
export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
