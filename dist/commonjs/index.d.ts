export default class BlockchainService {
    protected WEB3: any;
    protected SCA: any;
    protected gasPrice: any;
    protected ABI: any;
    constructor(RPC: string, gasPrice: number, SCA: string, ABI: any);
    createRaw(funcName?: string, params?: any[], from?: string, value?: number): Promise<{
        from: string;
        to: any;
        gasLimit: any;
        gasPrice: any;
        nonce: any;
        data: any;
        value: number;
    }>;
    signRaw(rawTx: {}, privateKey: any, chainId?: number): Promise<string>;
    sendSignedRaw(signedTx: string): Promise<{
        txHash: any;
        tx: any;
    }>;
    readFunc(funcName: string, params: any[], from: any): Promise<any>;
    getReceipt(txHash: string): Promise<any>;
    getEvent(topics?: any[], fromBlock?: number, toBlock?: number): Promise<any>;
}
