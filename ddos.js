//const BlockchainService = require("./dist/commonjs").default;
const BlockchainService = require("eth-blockchain-helper").default;

// const RPC= "https://data-seed-prebsc-2-s1.binance.org:8545/";
// const RPC = "https://agridential.vbchain.vn/VBCinternship2023"
const RPC = "https://mbc-seed-2.vbchain.vn"

//const RPC= "https://zksync2-mainnet.zksync.io";
const chainId = 4444;
const SCA= "0xe37A7824aFA6a73FECFb47aF72D1dF6eDE85046D";
const gasBasePrice = 10;

const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "value",
				"type": "string"
			}
		],
		"name": "writeData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			}
		],
		"name": "readData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const instance = new BlockchainService(RPC,chainId,SCA,ABI,gasBasePrice) 

async function main() {
  var raw = await instance.createRaw("writeData",["a","b"],"0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95")

  const raws = [];

for (let i = 0; i < 10; i++) {
  const nonce = raw.nonce + i;
  const object = {
    from: '0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95',
    to: '0xe37A7824aFA6a73FECFb47aF72D1dF6eDE85046D',
    gasLimit: 52170,
    gasPrice: 10,
    nonce: nonce,
    data: '0x1eeec4ea000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001610000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016200000000000000000000000000000000000000000000000000000000000000',
    value: 0
  };

  raws.push(object);
}

console.log(raws);

let signedRaws = []

for (let raw of raws) {
  const signedRaw = await instance.signRaw(raw,"7bf23f228d212cebfc25299fc666780ecd13bc117b51a2546d4e32c67c168c22")
  signedRaws.push(signedRaw)
}

console.log("signedRaws",signedRaws)

for (let i=0;i<10;i++) {
  instance.sendSignedRaw(signedRaws[i])
}

}

main();