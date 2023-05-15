import * as dotenv from 'dotenv';
dotenv.config();
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      accounts: { count: 20 },
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    goerli: {
			url: "https://eth-goerli.g.alchemy.com/v2/yiaZ5Hg5fTRH46ijJywVW1WF5ltv47xI",
			accounts: [process.env.DEPLOY_ACCOUNT!],
			chainId: 5,
		},
    mainnet: {
      url: 'https://bsc-dataseed1.ninicoin.io',
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    polygonMumbai: {
			url: "https://matic-mumbai.chainstacklabs.com",
			accounts: [process.env.DEPLOY_ACCOUNT!],
			chainId: 80001,
		},
    auroraTestnet: {
			url: "https://testnet.aurora.dev",
			accounts: [process.env.DEPLOY_ACCOUNT!]
		},
		arbitrumGoerli: {
			// url: "https://arb-goerli.g.alchemy.com/v2/HvsY1VKZgg_YEJHv_o9GAjjaLmmEO8Xl",
			url: "https://goerli-rollup.arbitrum.io/rpc",
			accounts: [process.env.DEPLOY_ACCOUNT!]
		}
  },
  etherscan: {
    apiKey: {
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      bscTestnet: `${process.env.BINANCE_API_KEY}`,
      polygonMumbai: process.env.POLYGON_TEST_API_KEY!,
      auroraTestnet: process.env.AURORA_TEST_API_KEY!,
			arbitrumGoerli: process.env.ARBITRUM_GOERLI_TEST_API_KEY!
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
      {
        version: '0.7.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};

export default config;
