export default class BlockchainService {
    protected WEB3: any;
    protected gasPrice: any;
    protected ABI: any;
    protected SCA: any;
    constructor(RPC: string, gasPrice: number, ABI: any, SCA: string);
    createRaw(funcName?: string, params?: any[], from?: string): Promise<{
        from: string;
        to: any;
        gasLimit: any;
        gasPrice: any;
        nonce: any;
        data: any;
    }>;
    sendRaw(rawTx: {}, privateKey: any, chainId?: number): Promise<{
        txHash: any;
        tx: any;
    }>;
    readFunc(funcName: string, params: any[], from: any): Promise<any>;
    getReceipt(): Promise<void>;
    getEvent(): Promise<void>;
}
