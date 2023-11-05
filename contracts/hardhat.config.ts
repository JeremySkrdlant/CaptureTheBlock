import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: 'localhost',
  networks: {
    beeple: {
      url: "http://10.200.0.60:8545"
    },
    vitalik: {
      url: "http://10.200.0.61:8545"
    },
    other: {
      url: "http://10.200.0.62:8545"
    }
  },
  solidity: "0.8.20",
};

export default config;
