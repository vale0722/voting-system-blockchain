# Ethereum Voting System

A simple voting system built on Ethereum using Hardhat.

## Features:

- Only the owner can add proposals.
- A whitelist system to allow specific addresses to vote.
- Each whitelisted address can vote only once.
- Events for added proposals and votes for easy tracking.

## Setup:

1. Install dependencies:
```shell

```

2. Compile the smart contract:
```shell
npx hardhat compile
```

3. Deploy the smart contract (for example, on the Sepholia testnet):

```shell
npx hardhat run scripts/deploy.js --network sepholia
```

Make sure to configure the `hardhat.config.js` with the appropriate network settings and credentials.

## Usage:

After deploying, you can interact with the contract using Hardhat or other Ethereum tools. You can add proposals, whitelist addresses, and vote on proposals.

## Additionals:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
```


## License:

MIT

