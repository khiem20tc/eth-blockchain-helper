'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const Tx = __importStar(require("ethereumjs-tx"));
class BlockchainService {
    constructor(RPC, gasPrice, SCA, ABI) {
        this.WEB3 = new web3_1.default(new web3_1.default.providers.HttpProvider(RPC));
        this.gasPrice = gasPrice;
        this.SCA = SCA;
        this.ABI = ABI;
    }
    createRaw(funcName = "", params = [], from = "", value = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let ABI = JSON.parse(JSON.stringify(this.ABI));
            const contractDeployed = new this.WEB3.eth.Contract(ABI, this.SCA);
            const dataFunc = yield contractDeployed.methods[funcName](...params).encodeABI();
            const gasLimit = yield contractDeployed.methods[funcName](...params).estimateGas({ from });
            const nonce = yield this.WEB3.eth.getTransactionCount(from);
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
        });
    }
    signRaw(rawTx = {}, privateKey, chainId = 97) {
        return __awaiter(this, void 0, void 0, function* () {
            privateKey = Buffer.from(privateKey, 'hex');
            var transaction = new Tx(rawTx, { chainId: chainId });
            yield transaction.sign(privateKey);
            let signedTx = '0x' + transaction.serialize().toString('hex');
            return signedTx;
        });
    }
    sendSignedRaw(signedTx) {
        return __awaiter(this, void 0, void 0, function* () {
            let txHash = this.WEB3.utils.keccak256(signedTx);
            const tx = yield this.WEB3.eth.sendSignedTransaction(signedTx);
            return { txHash, tx };
        });
    }
    readFunc(funcName = "", params = [], from) {
        return __awaiter(this, void 0, void 0, function* () {
            let ABI = JSON.parse(JSON.stringify(this.ABI));
            const contractDeployed = new this.WEB3.eth.Contract(ABI, this.SCA);
            const dataFunc = yield contractDeployed.methods[funcName](...params).call({ from });
            return dataFunc;
        });
    }
    getReceipt(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const receipt = this.WEB3.eth.getTransactionReceipt(txHash);
            return receipt;
        });
    }
    getEvent(topics = [], fromBlock = 0, toBlock = 499) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.WEB3.eth.getPastLogs({
                address: this.SCA,
                topics,
                fromBlock,
                toBlock
            });
            return event;
        });
    }
    decodeLog(data = "", topics = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let ABI = JSON.parse(JSON.stringify(this.ABI));
            const result = yield this.WEB3.eth.abi.decodeLog(ABI, data, topics);
            return result;
        });
    }
}
exports.default = BlockchainService;
//# sourceMappingURL=index.js.map