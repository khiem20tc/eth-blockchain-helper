'use strict';

import Web3 from "web3";
import {Transaction} from "ethereumjs-tx";
//const Transaction = require("ethereumjs-tx")

export default class BlockchainService {
    
    protected WEB3
    protected gasPrice
    protected ABI
    protected SCA

    constructor(RPC:string,gasPrice:number,ABI:any,SCA:string) {
      this.WEB3 = new Web3(
        new Web3.providers.HttpProvider(RPC)
      );

      this.gasPrice = gasPrice;
      this.ABI = ABI;
      this.SCA = SCA;
    }

    public async createRaw(funcName="",params=[],from="") {
      
      let ABI = JSON.parse(this.ABI.toString())

      const contractDeployed = new this.WEB3.eth.Contract(
        ABI,
        this.SCA
      );

      const dataFunc = await contractDeployed.methods[funcName](
        ...params
      ).encodeABI();

      const gasLimit = await contractDeployed.methods[funcName](
        ...params
      ).estimateGas()

      const nonce = await this.WEB3.eth.getTransactionCount(from)

      const rawTx = {
        from: from,
        to: this.SCA,
        gasLimit,
        gasPrice: this.gasPrice,
        nonce: nonce,
        data: dataFunc,
      };

      console.log("raw",rawTx)

      return rawTx;
    }

    public async sendRaw(rawTx = {}, privateKey, chainId=97) {

      privateKey = Buffer.from(privateKey, 'hex')  

      var transaction = new Transaction(rawTx, {chain: chainId})

      await transaction.sign(privateKey)

      let signedTx = '0x' + transaction.serialize().toString('hex')

      let txHash = this.WEB3.utils.keccak256(signedTx) // ALIAS

      const tx = await this.WEB3.eth.sendSignedTransaction(signedTx);

      return {txHash, tx};
    }

    public async readFunc(funcName="",params=[], from) {

      let ABI = JSON.parse(this.ABI.toString())

      const contractDeployed = new this.WEB3.eth.Contract(
        ABI,
        this.SCA
      );

      const dataFunc = await contractDeployed.methods[funcName](
        ...params
      ).call({ from });

      return dataFunc;
        
    }

    public async getReceipt() {
        
    }

    public async getEvent() {
        
    }
}