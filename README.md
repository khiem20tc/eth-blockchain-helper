# eth-blockchain-helper
This library help interacts with Smart Contract and more Web3 utils in any networks based on the EVM platform (Ethereum, Binance Smart Chain, Polygon,...).

## Features 

### Block

> **Get block** 

> **Get base fee of block EIP-1559** 

### Transaction

> **Create raw transaction** 

> **Sign raw transaction**

> **Send raw transaction**

> **Decode raw transaction**

> **Get transaction**

> **Get receipt transaction**

> **Create raw transaction EIP-1559** 

> **Sign raw transaction EIP-1559** 

### Event

> **Get event log**

> **Decode event log**

### Signature

> **Sign message**

> **Recovery signer**

### Function

> **Get function calldata**

> **Decode function calldata**

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
const [RPC,chainId,SCA,ABI,gasBasePrice] 
const instance = new BlockchainService(RPC,chainId,SCA,ABI,gasBasePrice);

/* Usage with methods */

  // create raw transaction
  const rawTx = await instance.createRaw("setValue",
    ["hi",1],
    "0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95");

  // create raw transaction with EIP-1559
  const rawTx = await instance.createRawEIP1559("setValue",
    ["hi",1],
    "0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95");

  // decode raw transaction
  const decode = await instance.decodeRaw("0xf9012280808094739ec8b040502bf50f3fe3fc96ab5af0803d89fe80b8c4e26b5771490e6b0a1f64e7fd3ccef41e61182dc198732945d88833677850c7fc8656a86d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000412530b686d44c26c93d0541101f4da47d3db4b6713d6300072b761883d138e89c5631204c6f89fdd398bc5b6702432d556830eb4578f741950ab31722e2c8d87d1b000000000000000000000000000000000000000000000000000000000000001ba0d7b51dcc2c2f0ae1f1b0f54f900f914dea7a31b9f4d9b4ff82420a4a4cd2dbdca007e9d1c43fc375f77f4a092f5bee0700ec096409b5904ec454da6a8bcf28bd9a");

  // recovery signer
  const signer = await instance.recoverSigner("0xf2f5b5c06b13b9e1c801f4620b40e4d11ec4fadd70033d5e73c8044026b420e66d311f65954974c5e01521207274250046eb35cec5462ea4f7a20a174ca91d291b",
    "0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95",
    "0x739eC8b040502Bf50F3fE3FC96AB5af0803d89fe",
    "0xe26b5771",
    "ae162b82081a5a2991c5f804e2e556857f55b015289b9ed31c10a0e4fd4c209e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000410fd711c07b016cd2bb00035a1f0140b08dc5c33e8629fb3813be49910d5317f7941ed6b5a03aff08da967a83f04e5431670e93b716581c28b146b00a533c7008f100000000000000000000000000000000000000000000000000000000000000");

  // get block
  const block = await instance.getBlock(27025025);

  // get func calldata
  const funcCalldata = await instance.getFuncCall("setValue",
    ["hi",1]);
  
  //get transaction
  const transaction = await instance.getTransaction("0x087de883fc21bee35fd47c8f3940519b22a00f1f79c985690114cabed8c319ca");

  //decode funcCall
  const dataFuncCall = await instance.decodeFuncCall("0x7c2da7aa0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000026869000000000000000000000000000000000000000000000000000000000000");

```
