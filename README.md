# Crowdsale Project

This project implements a Crowdsale contract in Solidity, allowing investors to purchase tokens using Ether. The contract is developed using Truffle and OpenZeppelin.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Contract Structure](#contract-structure)
- [Testing](#testing)
- [Contributions](#contributions)
- [License](#license)

## Overview

The `Crowdsale` contract allows investors to buy tokens with Ether. The relationship between the number of tokens and the value in Wei is defined by the `rate` parameter.

### Features

- Purchase tokens with Ether
- Transaction logging through events
- Purchase validations

## Installation

### Prerequisites

- Node.js
- NPM
- Truffle
- Ganache (or another Ethereum environment)

### Installation Steps

1. Clone this repository:

   ```bash
   git clone <REPOSITORY_URL>
   cd crowdsale-project

   ```

2. Install the dependencies:

   ```bash
   npm install

   ```

3. Compile the contracts:

   ```bash
   truffle compile

   ```

4. Start the default server:

   ```bash
   truffle develop

   ```

5. Deploy:

   ```bash
   truffle migrate

   ```

6. Test:
   ```bash:
   truffle test
   ```

Usage
Interacting with the Contract
To purchase tokens, use the buyTokens function of the Crowdsale contract. The example below shows how to buy 1 token:

```javascript
const recipient = "<RECIPIENT_ADDRESS>";
await crowdSale.buyTokens(recipient, {
  from: recipient,
  value: web3.utils.toWei("1", "wei"),
});
```

| Paramater     | Type    | Description                                 |
| ------------- | ------- | ------------------------------------------- |
| `beneficiary` | address | The address of the recipient of the tokens. |
| `msg.value`   | uint256 | The value in Wei sent for the purchase.     |

Contract Structure
Crowdsale
The Crowdsale contract has the following functionalities:

Constructor: Initializes the contract with the rate, wallet, and token.
buyTokens: Allows the purchase of tokens, validating the transaction and emitting a TokenPurchase event.

forwardFunds: Forwards the funds to the specified address.

## Events

| Event           | Description                               |
| --------------- | ----------------------------------------- |
| `TokenPurchase` | Emits an event when tokens are purchased. |
