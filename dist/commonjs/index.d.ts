export declare class BlockchainService {
    protected WEB3: any;
    protected SCA: any;
    protected gasPrice: any;
    protected ABI: any;
    constructor(RPC: string, gasPrice: number, SCA: string, ABI: any);
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
    getReceipt(txHash: string): Promise<any>;
    getEvent(topics?: any[], fromBlock?: number): Promise<any>;
}
