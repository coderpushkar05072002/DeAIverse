require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const {
  ALCHEMY_SEPOLIA_RPC,
  DEPLOYER_PRIVATE_KEY,
} = process.env;

/** @type import("hardhat/config").HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // Local Hardhat node (chainId 31337 / 1337)
    localhost: {
      url: "http://127.0.0.1:8545",
      // yahan accounts intentionally NAHI diye,
      // taaki Hardhat node ke default unlocked accounts use ho jayen
    },

    // Sepolia testnet (Alchemy)
    sepolia: {
      url: ALCHEMY_SEPOLIA_RPC || "",
      accounts: DEPLOYER_PRIVATE_KEY ? [DEPLOYER_PRIVATE_KEY] : [],
    },
  },
};
