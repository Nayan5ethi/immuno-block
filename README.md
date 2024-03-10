# Immuno Block

## Description

Immuno block ensures secure and tamper-proof COVID-19 vaccine certificates using blockchain. Leveraging decentralized identity verification and smart contracts, the system enhances efficiency while prioritizing user privacy. With interoperability, a user-friendly interface, and an immutable audit trail, our project aims to revolutionize how vaccination data is managed and verified, fostering a safer and more interconnected world

## Table of Contents

- [Installation](#installation)
- [Demo](#demo)

## Installation

Ensure you have Node.js and npm installed on your machine. Then, run the following commands:

```sh
git clone
cd immuno-block
npm install
npx hardhat run scripts/deploy.cjs --network sepolia
```

Copy the contract addresses and add them to .env file

Ensure you have metamask installed and connected to the sepolia network, then run the following command:

```sh
npm run start
```

## Demo

The application is deployed on the sepolia network. You can access the application [here](https://immuno-block.vercel.app/)

### Demo Credentials

Import the following accounts into your metamask wallet to test the application:

Authority Account:

- Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
- Private Key: 0x5d2d4f3f

Doctor Account:

- Address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
- Private Key: 0x5d2d4f3f
