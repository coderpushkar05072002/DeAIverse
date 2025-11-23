export const TOKEN_ADDR  = import.meta.env.VITE_TOKEN_ADDR as `string`;
export const MARKET_ADDR = import.meta.env.VITE_MARKET_ADDR as `string`;
export const RPC_URL     = (import.meta.env.VITE_RPC_URL as `string`) || "http://127.0.0.1:8545";

export const DeaiTokenAbi = [
  { "type":"function","name":"approve","stateMutability":"nonpayable","inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"type":"bool"}]},
  { "type":"function","name":"balanceOf","stateMutability":"view","inputs":[{"name":"account","type":"address"}],"outputs":[{"type":"uint256"}]}
] as const;

export const ComputeMarketAbi = [
  { "type":"function","name":"nextTaskId","stateMutability":"view","inputs":[],"outputs":[{"type":"uint256"}]},
  { "type":"function","name":"createTask","stateMutability":"nonpayable","inputs":[{"name":"price","type":"uint256"},{"name":"datasetCID","type":"string"},{"name":"deadline","type":"uint256"}],"outputs":[]},
  { "type":"function","name":"acceptTask","stateMutability":"nonpayable","inputs":[{"name":"taskId","type":"uint256"}],"outputs":[]},
  { "type":"function","name":"startTask","stateMutability":"nonpayable","inputs":[{"name":"taskId","type":"uint256"}],"outputs":[]},
  { "type":"function","name":"submitResult","stateMutability":"nonpayable","inputs":[{"name":"taskId","type":"uint256"},{"name":"resultCID","type":"string"}],"outputs":[]},
  { "type":"function","name":"verifyAndRelease","stateMutability":"nonpayable","inputs":[{"name":"taskId","type":"uint256"},{"name":"ok","type":"bool"}],"outputs":[]},
  { "type":"function","name":"tasks","stateMutability":"view","inputs":[{"name":"id","type":"uint256"}],
    "outputs":[
      {"type":"uint256"},   // id
      {"type":"address"},   // consumer
      {"type":"address"},   // provider
      {"type":"uint256"},   // price
      {"type":"uint8"},     // status
      {"type":"string"},    // datasetCID
      {"type":"string"},    // resultCID
      {"type":"uint256"}    // deadline
    ]
  }
] as const;

export const STATUS = ["Created","Accepted","Running","Submitted","Verified","Cancelled"] as const;
