const BlockchainService = require("./dist/commonjs").default;

const RPC= "https://data-seed-prebsc-2-s1.binance.org:8545/";
const SCA= "0xBE8ed2602fF818715938e2C45d3f312a45Dda8F5";
const gasPrice = 10000000000;
const ABI=[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "NewAsset",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "EBS_CHAIN_MANAGER",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EBS_CONTROL",
    "outputs": [
      {
        "internalType": "contract IEBSControl",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EBS_MARKETPLACE",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EBS_PREORDER",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EBS_WRAPPER1",
    "outputs": [
      {
        "internalType": "contract IERC20Wrapper",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EBS_WRAPPER2",
    "outputs": [
      {
        "internalType": "contract IERC20Wrapper",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EBS_ZK_CLONE_FACOTRY",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EBS_ZK_MANAGER",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EBS_ZK_MANAGER_CALLER",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentSalt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deployedAssets",
    "outputs": [
      {
        "internalType": "contract InitializedProxy[]",
        "name": "asset",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "ownerSignature",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "tokenType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amounts",
        "type": "uint256"
      }
    ],
    "name": "newAsset",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes[]",
        "name": "ownerSignatures",
        "type": "bytes[]"
      },
      {
        "internalType": "address[]",
        "name": "tokens",
        "type": "address[]"
      },
      {
        "internalType": "uint8[]",
        "name": "tokenTypes",
        "type": "uint8[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "name": "newAssets",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "salt",
        "type": "uint256"
      }
    ],
    "name": "predictAsset",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "setInitializedProxyLogic",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "setOwnershipLogic",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const instante = new BlockchainService(RPC,gasPrice,SCA,ABI);

async function main() {
  // create raw transaction
  const rawTx = await instante.createRaw("newAsset",
    ["0x80f5dba5485e7dfa399c856234ebc22b17ab9ac6594a42cc5b66daa5e73e052262724c848c823ae8c4402a29333310c468b6af0c6e54cf07b4c7986100dd42591b", 
      "0x28367816f1f564c2c181013627ca39eed4c41cd9", 
      "3", 
      "76889264", 
      "1"],
    "0xF591BA1879Ad0c4B4048DE714a856138c37a31d3");

  console.log("rawTx",rawTx);

  // decode raw transaction
  const decode = await instante.decodeRaw("0xf9012280808094739ec8b040502bf50f3fe3fc96ab5af0803d89fe80b8c4e26b5771490e6b0a1f64e7fd3ccef41e61182dc198732945d88833677850c7fc8656a86d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000412530b686d44c26c93d0541101f4da47d3db4b6713d6300072b761883d138e89c5631204c6f89fdd398bc5b6702432d556830eb4578f741950ab31722e2c8d87d1b000000000000000000000000000000000000000000000000000000000000001ba0d7b51dcc2c2f0ae1f1b0f54f900f914dea7a31b9f4d9b4ff82420a4a4cd2dbdca007e9d1c43fc375f77f4a092f5bee0700ec096409b5904ec454da6a8bcf28bd9a");

  console.log("decode",decode);

  // recovery signer
  const signer = await instante.recoverSigner("0xf2f5b5c06b13b9e1c801f4620b40e4d11ec4fadd70033d5e73c8044026b420e66d311f65954974c5e01521207274250046eb35cec5462ea4f7a20a174ca91d291b",
    "0x560f8526C325d4C76DCf6F554F25e29Ad82C5a95",
    "0x739eC8b040502Bf50F3fE3FC96AB5af0803d89fe",
    "0xe26b5771",
    "ae162b82081a5a2991c5f804e2e556857f55b015289b9ed31c10a0e4fd4c209e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000410fd711c07b016cd2bb00035a1f0140b08dc5c33e8629fb3813be49910d5317f7941ed6b5a03aff08da967a83f04e5431670e93b716581c28b146b00a533c7008f100000000000000000000000000000000000000000000000000000000000000");

  console.log("signer",signer);

  // get block
  const block = await instante.getBlock(27025025);
  console.log("block",block);

  // get func calldata
  const funcCalldata = await instante.getFuncCall("newAsset",
  ["0x80f5dba5485e7dfa399c856234ebc22b17ab9ac6594a42cc5b66daa5e73e052262724c848c823ae8c4402a29333310c468b6af0c6e54cf07b4c7986100dd42591b", 
    "0x28367816f1f564c2c181013627ca39eed4c41cd9", 
    "3", 
    "76889264", 
    "1"],
  "0xF591BA1879Ad0c4B4048DE714a856138c37a31d3");
  console.log("funcCalldata",funcCalldata);
}

main();