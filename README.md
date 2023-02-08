# eth-blockchain-helper
This library help interacte with Smart Contract and more Web3 utils based on Ethereum platform.

## Features 

### Block

> **Get block** 

### Transaction

> **Create raw transaction** 

> **Sign raw transaction**

> **Send raw transaction**

> **Decode raw transaction**

> **Get receipt transaction**

### Event

> **Get event log**

> **Decode event log**

### Signature

> **Sign message**

> **Recovery signer**

### Function

> **Get function calldata**

> **Estimate gas**


### Install

```bash
  npm install eth-blockchain-helper --save
```

```javascript import
// es6
import BlockchainService from 'eth-blockchain-helper';

// node
const BlockchainService = require('eth-blockchain-helper').default;
```

```javascript usage
/* Config with constructor
*   @param {string} RPC - The RPC address of the Ethereum node you want to connect to.
*   @param {number} gasPrice - The gas price you want to use for your transactions.
*   @param {string} SCA - The address of the smart contract you want to interact with.
*   @param {any} ABI - The ABI of the contract you want to interact with.
*/ 
const [RPC,gasPrice,SCA,ABI] 
const instante = new BlockchainService(RPC,gasPrice,SCA,ABI);

/* Usage with methods */

// decode raw transaction
  const decode = await instante.decodeRaw("0xf9012280808094739ec8b040502bf50f3fe3fc96ab5af0803d89fe80b8c4e26b5771490e6b0a1f64e7fd3ccef41e61182dc198732945d88833677850c7fc8656a86d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000412530b686d44c26c93d0541101f4da47d3db4b6713d6300072b761883d138e89c5631204c6f89fdd398bc5b6702432d556830eb4578f741950ab31722e2c8d87d1b000000000000000000000000000000000000000000000000000000000000001ba0d7b51dcc2c2f0ae1f1b0f54f900f914dea7a31b9f4d9b4ff82420a4a4cd2dbdca007e9d1c43fc375f77f4a092f5bee0700ec096409b5904ec454da6a8bcf28bd9a");

```
