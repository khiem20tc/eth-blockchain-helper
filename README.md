# eth-blockchain-helper
This library help interacts with Smart Contract and more Web3 utils in any networks based on the EVM platform (Ethereum, Binance Smart Chain, Polygon,...).

## Features 

### Block

> **Get block** 

> **Get base fee of block EIP-1559** 

### Account

> **Get nonce** 

### Transaction

> **Create raw transaction** 

> **Sign raw transaction**

> **Send raw transaction**

> **Decode raw transaction**

> **Get transaction**

> **Get receipt transaction**

> **Create raw transaction EIP-1559** 

> **Sign raw transaction EIP-1559** 

> **Create raw transaction to deploy Smart Contract** 

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

### Contract

> **Pre-compute SCA with CREATE2 opcode**

### Wallet

> **Generate mnemonic**

> **Mnemonic To PrivateKey**

> **PrivateKey To PublicKey**

> **PublicKey To Address**

### Install

```bash
  npm install eth-blockchain-helper --save
```

```javascript import
// es6
import pkg from 'eth-blockchain-helper';
const BlockchainService = pkg.default;

// es5
const BlockchainService = require('eth-blockchain-helper').default;
```

```javascript usage
/** 
 * Config with constructor
 *
 *   @param {string} RPC - The RPC address of the Ethereum node you want to connect to.
 *   @param {string} chainId - The chainId of the Ethereum node you want to connect to.
 *   @param {string} SCA - The address of the smart contract you want to interact with.
 *   @param {any} ABI - The ABI of the contract you want to interact with.
 *   @param {number} gasBasePrice - The gas price you want to use for your transactions or base fee for EIP-1559.
 */ 
const [RPC,chainId,SCA,ABI,gasBasePrice] 
const instance = new BlockchainService(RPC,chainId,SCA,ABI,gasBasePrice);

/** Usage with methods */

  /** 
   * Create raw transaction
   *   @param [funcName] - The name of the function you want to call
   *   @param params - The parameters of the function you want to call.
   *   @param [from] - The address of the account that will be sending the transaction.
   *  @returns A raw transaction object.
   */
  const rawTx = await instance.createRaw("setValue",
    ["hi",1],
    "0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95");

  /** 
   * Create raw transaction with EIP-1559
   *   @param [funcName] - The name of the function you want to call.
   *   @param params - an array of parameters to pass to the function
   *   @param [from] - The address that will be sending the transaction.
   *   @param [value=0] - The amount of ETH you want to send with the transaction.
   *   @param [maxPriorityFeePerGas=0x01] - This is the amount of ETH TIPs you want to pay for the transaction miner
   *   to be prioritized.
   *  @returns A raw transaction object.
   */
  const rawTx = await instance.createRawEIP1559("setValue",
    ["hi",1],
    "0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95",
    0); //baseFee 

  /**
   * This function creates a raw transaction for deploying a smart contract with given bytecode,
   * parameters, sender address, and value.
   * @param [bytecode] - The bytecode of the smart contract that you want to deploy.
   * @param params - params is an array of input parameters that will be passed to the constructor of
   * the smart contract being deployed. These parameters are used to initialize the state variables of
   * the contract.
   * @param [from] - The Ethereum address that will be used to deploy the smart contract.
   * @param [value=0] - The `value` parameter in this function represents the amount of ether (in wei)
   * that is being sent along with the contract deployment transaction. It is set to 0 by default, but
   * can be changed to any valid amount of ether.
   * @returns a Promise that resolves to a raw transaction object (`rawTx`) which contains the
   * necessary information to deploy a smart contract on the Ethereum blockchain.
   */
  const rawTx = await instance.createRawDeploySC(bytecode, params, from, value);  

  /** 
   * Decode raw transaction
   *   @param {string} raw - The raw transaction string
   *   @param [chainId=97] - The chainId of the network you're on.
   *  @returns The rawTx object is being returned.
   */
  const decode = await instance.decodeRaw("0xf9012280808094739ec8b040502bf50f3fe3fc96ab5af0803d89fe80b8c4e26b5771490e6b0a1f64e7fd3ccef41e61182dc198732945d88833677850c7fc8656a86d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000412530b686d44c26c93d0541101f4da47d3db4b6713d6300072b761883d138e89c5631204c6f89fdd398bc5b6702432d556830eb4578f741950ab31722e2c8d87d1b000000000000000000000000000000000000000000000000000000000000001ba0d7b51dcc2c2f0ae1f1b0f54f900f914dea7a31b9f4d9b4ff82420a4a4cd2dbdca007e9d1c43fc375f77f4a092f5bee0700ec096409b5904ec454da6a8bcf28bd9a");

  /** 
   * Recovery signer 
   *   @param signature - The signature of the message
   *   @param params - The parameters that you want to hash.
   *  @returns The signer's address.
   */
  const signer = await instance.recoverSigner("0xf2f5b5c06b13b9e1c801f4620b40e4d11ec4fadd70033d5e73c8044026b420e66d311f65954974c5e01521207274250046eb35cec5462ea4f7a20a174ca91d291b",
    "0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95",
    "0x739eC8b040502Bf50F3fE3FC96AB5af0803d89fe",
    "0xe26b5771",
    "ae162b82081a5a2991c5f804e2e556857f55b015289b9ed31c10a0e4fd4c209e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000410fd711c07b016cd2bb00035a1f0140b08dc5c33e8629fb3813be49910d5317f7941ed6b5a03aff08da967a83f04e5431670e93b716581c28b146b00a533c7008f100000000000000000000000000000000000000000000000000000000000000");

  /** 
   * Get block 
   *   @param [blockNumber=lastest] - The block number to get the block from.
   *  @returns The block object.
   */
  const block = await instance.getBlock(27025025);

  /**
   *  Get func calldata 
   *   @param funcName - The name of the function you want to call.
   *   @param params - an array of parameters to pass to the function.
   *  @returns The call data for the function call.
   */
  const funcCalldata = await instance.getFuncCall("setValue",
    ["hi",1]);
  
  /** 
   * Get transaction 
   *   @param {string} txHash - The transaction hash of the transaction you want to get.
   *  @returns A transaction object
   */
  const transaction = await instance.getTransaction("0x087de883fc21bee35fd47c8f3940519b22a00f1f79c985690114cabed8c319ca");

  /** 
   * Decode funcCall 
   *   @param data - The data field of the transaction.
   *  @returns The decoded data is being returned.
   */
  const dataFuncCall = await instance.decodeFuncCall("0x7c2da7aa0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000026869000000000000000000000000000000000000000000000000000000000000");

  /** 
   * Pre compute contract address created by CREATE2 opcode 
   *   @param address - The address of the contract that will be created.
   *   @param salt - A 256-bit salt value.
   *   @param initCode - The bytecode of the contract you want to deploy.
   *  @returns The address of the contract that will be created.
   */
  const SCA = await instance.precomputeCreate2("0x871d7bD834be976192a39f9E2dDB053D14E115A7",1,"0x60806040526040516102f33803806102f38339818101604052810190610025919061010c565b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600181905550505061014c565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100a382610078565b9050919050565b6100b381610098565b81146100be57600080fd5b50565b6000815190506100d0816100aa565b92915050565b6000819050919050565b6100e9816100d6565b81146100f457600080fd5b50565b600081519050610106816100e0565b92915050565b6000806040838503121561012357610122610073565b5b6000610131858286016100c1565b9250506020610142858286016100f7565b9150509250929050565b6101988061015b6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806312065fe0146100465780638da5cb5b14610064578063c298557814610082575b600080fd5b61004e6100a0565b60405161005b91906100eb565b60405180910390f35b61006c6100a8565b6040516100799190610147565b60405180910390f35b61008a6100cc565b60405161009791906100eb565b60405180910390f35b600047905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b6000819050919050565b6100e5816100d2565b82525050565b600060208201905061010060008301846100dc565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061013182610106565b9050919050565b61014181610126565b82525050565b600060208201905061015c6000830184610138565b9291505056fea264697066735822122068b729b8e4c2b376c9614dcdd0cf43913ec035f3ccb835951e32acb5157832ed64736f6c63430008110033000000000000000000000000560f8526c325d4c76dcf6f554f25e29ad82c5a950000000000000000000000000000000000000000000000000000000000000001");


```

### Contact and donation

[Contact me by email](mailto:khiem20tc@gmail.com)

[Buy me a coffee](https://www.buymeacoffee.com/hkne)