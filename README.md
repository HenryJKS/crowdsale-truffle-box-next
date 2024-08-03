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