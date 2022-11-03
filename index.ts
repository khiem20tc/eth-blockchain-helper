'use strict';

import Web3 from "web3";
import {Transaction} from "ethereumjs-tx";
//const Transaction = require("ethereumjs-tx")

export default class BlockchainService {
    
    protected WEB3
    protected SCA
    protected gasPrice
    protected ABI

    /**
     * The constructor function is used to initialize the web3 object, gas price, smart contract
     * address, and smart contract ABI
     * @param {string} RPC - The RPC address of the Ethereum node you want to connect to.
     * @param {number} gasPrice - The gas price you want to use for your transactions.
     * @param {string} SCA - The address of the smart contract you want to interact with.
     * @param {any} ABI - The ABI of the contract you want to interact with.
     */
    constructor(RPC:string,gasPrice:number,SCA:string,ABI:any) {
      this.WEB3 = new Web3(
        new Web3.providers.HttpProvider(RPC)
      );

      this.gasPrice = gasPrice;
      this.SCA = SCA;
      this.ABI = ABI;
    }

    /**
     * It takes a function name, parameters, and a from address, and returns a raw transaction object
     * @param [funcName] - The name of the function you want to call
     * @param params - The parameters of the function you want to call.
     * @param [from] - The address of the account that will be sending the transaction.
     * @returns A raw transaction object.
     */
    public async createRaw(funcName="",params=[],from="",value=0) {
      
      let ABI = JSON.parse(JSON.stringify(this.ABI))

      const contractDeployed = new this.WEB3.eth.Contract(
        ABI,
        this.SCA
      );

      const dataFunc = await contractDeployed.methods[funcName](
        ...params
      ).encodeABI();

      const gasLimit = await contractDeployed.methods[funcName](
        ...params
      ).estimateGas({ from })

      const nonce = await this.WEB3.eth.getTransactionCount(from)

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
    public async signRaw(rawTx = {}, privateKey, chainId=97) {

      privateKey = Buffer.from(privateKey, 'hex')  

      var transaction = new Transaction(rawTx, {chain: chainId})

      await transaction.sign(privateKey)

      let signedTx = '0x' + transaction.serialize().toString('hex')

      return signedTx;
    }

   /**
    * It sends a signed transaction to the blockchain.
    * @param {string} signedTx - The signed transaction in hex format.
    * @returns The txHash and the tx object.
    */
    public async sendSignedRaw(signedTx: string) {

      let txHash = this.WEB3.utils.keccak256(signedTx) // ALIAS

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
    public async readFunc(funcName="",params=[], from) {

      let ABI = JSON.parse(JSON.stringify(this.ABI))

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
     * This function returns the receipt of a transaction
     * @param {string} txHash - The transaction hash of the transaction you want to get the receipt
     * for.
     * @returns The receipt of the transaction.
     */
    public async getReceipt(txHash: string) {
        const receipt = this.WEB3.eth.getTransactionReceipt(txHash);

        return receipt;
    }

    /**
     * This function returns event logs is published from a smart contract
     * @param {array} topics - The topics of log
     * topics[0]: signature event
     * topics[1-3]: indexed params
     * @returns The event log.
     */
    public async getEvent(topics=[], fromBlock=0, toBlock=499) {
      const event = await this.WEB3.eth.getPastLogs({
        address: this.SCA, //smart contract address published event
        topics, 
        fromBlock,
        toBlock
    })

    return event;
    }
}