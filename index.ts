"use strict";

import Web3 from "web3";
import {default as Tx} from "ethereumjs-tx";
import abiDecoder from "abi-decoder";
import { Common, Hardfork } from "@ethereumjs/common";
import { FeeMarketEIP1559Transaction } from "@ethereumjs/tx";

interface rawTx {
  from: string,
      to?: string,
      gasLimit: any,
      gasPrice: any,
      nonce: any,
      data: string,
      value: any
}

interface rawTx1559 {
  from: string,
      to: string,
      gasLimit: any,
      maxPriorityFeePerGas: any,
      maxFeePerGas: any,
      nonce: any,
      data: string,
      value: any,
      type: any
      accessList: any
}

export default class BlockchainService {
    
  protected WEB3;
  protected chainId;
  protected SCA;
  protected gasPrice;
  protected ABI;
  protected maxFeePerGas;

  /**
     * The constructor function is used to initialize the web3 object, gas price, smart contract
     * address, and smart contract ABI
     * @param {string} RPC - The RPC address of the Ethereum node you want to connect to.
     * @param {string} chainId - The chainId of the Ethereum node you want to connect to.
     * @param {number} gasPrice - The gas price you want to use for your transactions.
     * @param {string} SCA - The address of the smart contract you want to interact with.
     * @param {any} ABI - The ABI of the contract you want to interact with.
     * @param {any} maxFeePerGas - The maxFeePerGas of the block you want to boradcast transaction.
     */
  constructor(RPC:string,chainId:number,SCA:string,ABI:any,gasBasePrice:any) {
    this.WEB3 = new Web3(
      new Web3.providers.HttpProvider(RPC)
    );
    this.chainId = chainId;
    this.gasPrice = gasBasePrice; //default config 0
    this.SCA = SCA;
    this.ABI = ABI;
    this.maxFeePerGas = gasBasePrice; // default config 255 for EIP-1559
  }

  // TRANSACTION MODULE

  /**
     * It takes a function name, parameters, and a from address, and returns a raw transaction object
     * @param [funcName] - The name of the function you want to call
     * @param params - The parameters of the function you want to call.
     * @param [from] - The address of the account that will be sending the transaction.
     * @returns A raw transaction object.
     */
  public async createRaw(funcName="",params=[],from="",value=0): Promise<rawTx> {
      
    const ABI = JSON.parse(JSON.stringify(this.ABI));

    const contractDeployed = new this.WEB3.eth.Contract(
      ABI,
      this.SCA
    );

    const dataFunc = await contractDeployed.methods[funcName](
      ...params
    ).encodeABI();

    const gasLimit = await contractDeployed.methods[funcName](
      ...params
    ).estimateGas({ from });

    const nonce = await this.WEB3.eth.getTransactionCount(from);

    const rawTx = {
      from: from,
      to: this.SCA,
      gasLimit,
      gasPrice: this.gasPrice,
      nonce: nonce,
      data: dataFunc,
      value: value
    };

    return rawTx;
  }

  /**
     * It takes a raw transaction object, a private key, and a chain ID, and returns a transaction hash
     * and the transaction object
     * @param rawTx - The raw transaction object.
     * @param privateKey - The private key of the account you want to send the transaction from.
     * @param [chainId=97] - The chain ID of the network you're sending to.
     * @returns The transaction hash and the transaction object.
     */
  public async signRaw(rawTx = {}, privateKey) {

    privateKey = Buffer.from(privateKey, "hex");

    const transaction = new Tx(rawTx, {chainId: this.chainId});

    await transaction.sign(privateKey);

    const signedTx = "0x" + transaction.serialize().toString("hex");

    return signedTx;
  }

  /**
   * It returns the base fee per gas.
   * @returns The base fee per gas.
   */
  public async getBaseFeePerGas() {
    
    const block = await this.WEB3.eth.getBlock("pending");

    const baseFeePerGas = block.baseFeePerGas;
    
    return baseFeePerGas;

  }

  /**
  * It takes in a function name, parameters, the address of the sender, the value of the transaction,
  * and the maxPriorityFeePerGas, and returns a raw transaction object
  * @param [funcName] - The name of the function you want to call.
  * @param params - an array of parameters to pass to the function
  * @param [from] - The address that will be sending the transaction.
  * @param [value=0] - The amount of ETH you want to send with the transaction.
  * @param [maxPriorityFeePerGas=0x01] - This is the amount of ETH TIPs you want to pay for the transaction miner
  * to be prioritized.
  * @returns A raw transaction object.
  */
 
  public async createRawEIP1559(funcName="",params=[],from="",value=0,maxPriorityFeePerGas="0x01"): Promise<rawTx1559> {
      
    const ABI = JSON.parse(JSON.stringify(this.ABI));

    const contractDeployed = new this.WEB3.eth.Contract(
      ABI,
      this.SCA
    );

    const dataFunc = await contractDeployed.methods[funcName](
      ...params
    ).encodeABI();

    const gasLimit = await contractDeployed.methods[funcName](
      ...params
    ).estimateGas({ from });

    const nonce = await this.WEB3.eth.getTransactionCount(from);

    const rawTx = {
      from: from,
      to: this.SCA,
      gasLimit,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      maxFeePerGas: this.maxFeePerGas,
      nonce: nonce,
      data: dataFunc,
      value: value,
      type: "0x02",
      accessList: []
    };

    return rawTx;
  }

  /**
   * It takes a raw transaction object and a private key, and returns a signed transaction
   * @param rawTx - The raw transaction object.
   * @param privateKey - The private key of the account you want to sign the transaction with.
   * @returns A signed transaction
   */
  public async signRawEIP1559(rawTx = {}, privateKey) {

    privateKey = Buffer.from(privateKey, "hex");

    const common = Common.custom({ chainId: this.chainId }, {hardfork: Hardfork.London});

    let transaction = FeeMarketEIP1559Transaction.fromTxData(rawTx, { common });

    transaction = transaction.sign(privateKey);

    const signedTx = "0x" + transaction.serialize().toString("hex");

    return signedTx;
  }

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
  public async createRawDeploySC(bytecode="", params=[],from="",value=0): Promise<rawTx> {

    const ABI = JSON.parse(JSON.stringify(this.ABI));

    let contract = new this.WEB3.eth.Contract(ABI);

    const nonce = await this.WEB3.eth.getTransactionCount(from);

    const contractData = contract
    .deploy({
        data: bytecode,
        arguments: params
    })
    .encodeABI()

    const gasLimit = contract
    .deploy({
        data: bytecode,
        arguments: params
    }).estimateGas({ from });

    const rawTx = {
      nonce: this.WEB3.utils.toHex(nonce),
      gasLimit: this.WEB3.utils.toHex(gasLimit),
      gasPrice: this.WEB3.utils.toHex(this.gasPrice),
      from: from, 
      data: contractData,
      //to: "0x0000000000000000000000000000000000000000",
      value: this.WEB3.utils.toHex(value)
    }; 

    return rawTx;
  }

  /**
   * It takes a raw transaction string, and returns an object with the transaction's details
   * @param {string} raw - The raw transaction string
   * @param [chainId=97] - The chainId of the network you're on.
   * @returns The rawTx object is being returned.
   */
  public async decodeRaw(raw: string) {
    const tx = new Tx(raw);

    const [
      nonce, gasPrice,
      gasLimit, to,
      value, data,
      v, r,
      s
    ] = tx.toJSON();

    const rawTx = {
      nonce, gasPrice,
      gasLimit, to,
      value, data,
      v, r,
      s, 
      chainId: tx._chainId,
      from: "0x" + tx.getSenderAddress().toString("hex"),
      txHash: "0x" + tx.hash().toString("hex")
    };
      
    return rawTx;
  }

  /**
    * It sends a signed transaction to the blockchain.
    * @param {string} signedTx - The signed transaction in hex format.
    * @returns The txHash and the tx object.
    */
  public async sendSignedRaw(signedTx: string) {

    const txHash = this.WEB3.utils.keccak256(signedTx); // ALIAS

    const tx = await this.WEB3.eth.sendSignedTransaction(signedTx);

    return {txHash, tx};
  }

  /**
     * It takes in a function name, parameters, and a from address, and returns the data from the
     * function
     * @param [funcName] - The name of the function you want to call.
     * @param params - an array of parameters that the function takes.
     * @param from - The address of the account that will be used to call the function.
     * @returns The return value of the function.
     */
  public async readFunc(funcName="",params, from) {

    const ABI = JSON.parse(JSON.stringify(this.ABI));

    const contractDeployed = new this.WEB3.eth.Contract(
      ABI,
      this.SCA
    );

    const dataFunc = await contractDeployed.methods[funcName](
      ...params
    ).call({ from });

    return dataFunc;
        
  }

  /**
   * It returns the transaction object for the given transaction hash
   * @param {string} txHash - The transaction hash of the transaction you want to get.
   * @returns A transaction object
   */
  public async getTransaction(txHash: string) {
    const transaction = this.WEB3.eth.getTransaction(txHash);

    return transaction;
  }

  /**
     * This function returns the receipt of a transaction
     * @param {string} txHash - The transaction hash of the transaction you want to get the receipt
     * for.
     * @returns The receipt of the transaction.
     */
  public async getReceipt(txHash: string) {
    const receipt = this.WEB3.eth.getTransactionReceipt(txHash);

    return receipt;
  }

  // EVENT MODULE

  /**
     * This function returns event logs is published from a smart contract
     * @param {array} topics - The topics of log
     * topics[0]: signature event
     * topics[1-3]: indexed params
     * @returns The event log.
     */
  public async getEvent(topics, fromBlock=0, toBlock=499) {
    const event = await this.WEB3.eth.getPastLogs({
      address: this.SCA, //smart contract address published event
      topics, 
      fromBlock,
      toBlock
    });

    return event;
  }

  /**
     * It takes the ABI of the contract, the data from the log, and the topics from the log, and
     * returns the decoded log
     * @param [data] - The data parameter is the data that was emitted from the contract.
     * @param topics - An array of values generated by the: event.raw.topics
     * @returns The decoded log.
     */
  public async decodeLog(data="",topics) {

    const ABI = JSON.parse(JSON.stringify(this.ABI));

    const result = await this.WEB3.eth.abi.decodeLog(ABI, data, topics);

    return result;
  }

  // SIGNATURE MODULE

  /**
  * It takes a private key and a list of parameters, hashes them, and then signs the hash with the
  * private key
  * @param privatekey - The private key of the account that will sign the message.
  * @param params - The parameters that you want to sign.
  * @returns The signature of the message.
  */
  public async signMessage (privatekey, ...params) {

    const message = await this.WEB3.utils.soliditySha3(
      ...params
    );

    const signature = await this.WEB3.eth.accounts.sign(
      message,
      privatekey, 
    );

    return signature;
  }

  /**
   * It takes a signature and a list of parameters, hashes the parameters, and then recovers the
   * signer's address from the signature
   * @param signature - The signature of the message
   * @param params - The parameters that you want to hash.
   * @returns The signer's address.
   */
  public async recoverSigner (signature, ...params) {

    const message = await this.WEB3.utils.soliditySha3(
      ...params
    );

    const signer = await this.WEB3.eth.accounts.recover(
      message,
      signature, 
    );

    return signer;
  }

  // BLOCK MODULE

  /**
   * It gets the block number from the blockchain.
   * @param [blockNumber=lastest] - The block number to get the block from.
   * @returns The block object.
   */
  public async getBlock (blockNumber = "lastest") {
    
    const block = await this.WEB3.eth.getBlock(blockNumber);
    return block;

  }

  // ACCOUNT MODULE

  /**
   * This function retrieves the nonce for a given Ethereum address using the Web3 library in
   * TypeScript.
   * @param [address] - The Ethereum address for which the nonce is being retrieved. The nonce is a
   * unique number used to prevent replay attacks on transactions.
   * @returns The function `getNonce` returns the nonce of a given Ethereum address. The nonce is a
   * number that represents the number of transactions sent from a specific address. The function uses
   * the `WEB3` library to interact with the Ethereum blockchain and retrieve the nonce. The returned
   * value is the nonce as a number.
   */
  
  public async getNonce (address = "") {
    
    const nonce = await this.WEB3.eth.getNonce(address);
    return nonce;

  }

  // FUNCTION MODULE

  /**
   * It takes a function name and an array of parameters, and returns the encoded ABI of the function
   * call
   * @param funcName - The name of the function you want to call.
   * @param params - an array of parameters to pass to the function.
   * @returns The call data for the function call.
   */
  public async getFuncCall (funcName, params =[]) {

    const ABI = JSON.parse(JSON.stringify(this.ABI));

    const contractDeployed = new this.WEB3.eth.Contract(
      ABI,
      this.SCA
    );

    const callData = await contractDeployed.methods[funcName](
      ...params
    ).encodeABI();

    return callData;
    
  }

  /**
   * It takes in a transaction's data field, decodes it using the ABI, and returns the decoded data
   * @param data - The data field of the transaction.
   * @returns The decoded data is being returned.
   */
  public async decodeFuncCall (data) {

    abiDecoder.addABI(this.ABI);

    const decodedData = abiDecoder.decodeMethod(data);

    return decodedData;

  }

  /**
   * It returns the estimated gas cost of a function call
   * @param funcName - The name of the function you want to call.
   * @param params - an array of parameters to pass to the function
   * @param from - The address of the account that will be used to send the transaction.
   * @returns The estimated gas for the transaction.
   */
  public async estimateGas (funcName, params =[], from) {

    const ABI = JSON.parse(JSON.stringify(this.ABI));

    const contractDeployed = new this.WEB3.eth.Contract(
      ABI,
      this.SCA
    );

    const gasEstimated = await contractDeployed.methods[funcName](
      ...params
    ).estimateGas({ from });

    return gasEstimated;
    
  }

 /**
  * It creates a new address based on the address, salt, and initCode.
  * @param address - The address of the contract that will be created.
  * @param salt - A 256-bit salt value.
  * @param initCode - The bytecode of the contract you want to deploy.
  * @returns The address of the contract that will be created.
  */
  public async precomputeCreate2 (address, salt, initCode) {

    let codeHash = await this.WEB3.utils.soliditySha3(initCode);

    const hash = await this.WEB3.utils.soliditySha3(
      { t: 'bytes1', v: '0xff' },
      { t: 'address', v: address },
      { t: 'uint256', v: salt },
      { t: 'bytes', v: codeHash }
    );
    
    // NOTE: cast last 20 bytes of hash to address
    return '0x' + hash.slice(26);
  }

}