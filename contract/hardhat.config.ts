import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/iF8yHSXHYg-40CtC1u22m45OFvIzKSh7",
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
  },
  etherscan: {
    apiKey: "G4C7V1QEJ5GR63UJ3GMKBW1XYNPZDRTVK7"
  }
};

export default config;
