require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

require('@nomiclabs/hardhat-waffle');

const { SE_POLIA_RPC_URL, SE_POLIA_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: SE_POLIA_RPC_URL,
      accounts: [SE_POLIA_PRIVATE_KEY],
    },
  },
};
