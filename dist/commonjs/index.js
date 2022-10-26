'use strict';
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
const ethereumjs_tx_1 = require("ethereumjs-tx");
class BlockchainService {
    constructor(RPC, gasPrice, ABI, SCA) {
        this.WEB3 = new web3_1.default(new web3_1.default.providers.HttpProvider(RPC));
        this.gasPrice = gasPrice;
        this.ABI = ABI;
        this.SCA = SCA;
    }
    createRaw(funcName = "", params = [], from = "") {
        return __awaiter(this, void 0, void 0, function* () {
            let ABI = JSON.parse(this.ABI.toString());
            const contractDeployed = new this.WEB3.eth.Contract(ABI, this.SCA);
            const dataFunc = yield contractDeployed.methods[funcName](...params).encodeABI();
            const gasLimit = yield contractDeployed.methods[funcName](...params).estimateGas();
            const nonce = yield this.WEB3.eth.getTransactionCount(from);
            const rawTx = {
                from: from,
                to: this.SCA,
                gasLimit,
                gasPrice: this.gasPrice,
                nonce: nonce,
                data: dataFunc,
            };
            console.log("raw", rawTx);
            return rawTx;
        });
    }
    sendRaw(rawTx = {}, privateKey, chainId = 97) {
        return __awaiter(this, void 0, void 0, function* () {
            privateKey = Buffer.from(privateKey, 'hex');
            var transaction = new ethereumjs_tx_1.Transaction(rawTx, { chain: chainId });
            yield transaction.sign(privateKey);
            let signedTx = '0x' + transaction.serialize().toString('hex');
            let txHash = this.WEB3.utils.keccak256(signedTx);
            const tx = yield this.WEB3.eth.sendSignedTransaction(signedTx);
            return { txHash, tx };
        });
    }
    readFunc(funcName = "", params = [], from) {
        return __awaiter(this, void 0, void 0, function* () {
            let ABI = JSON.parse(this.ABI.toString());
            const contractDeployed = new this.WEB3.eth.Contract(ABI, this.SCA);
            const dataFunc = yield contractDeployed.methods[funcName](...params).call({ from });
            return dataFunc;
        });
    }
    getReceipt() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getEvent() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = BlockchainService;
//# sourceMappingURL=index.js.map