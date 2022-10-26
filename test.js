// const BlockchainService = require("./index.ts")
// 'use strict'
const BlockchainService = require('./dist/commonjs/index.js');
// import * as BlockchainService from "blockchain-helper"

const main = async function() {
    const instance = new BlockchainService(
        "https://data-seed-prebsc-1-s1.binance.org:8545",
        50,
        [
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
              "stateMutability": "payable",
              "type": "fallback"
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
              "inputs": [
                {
                  "internalType": "address",
                  "name": "ownershipAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "newR",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "newS",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes1",
                  "name": "newV",
                  "type": "bytes1"
                },
                {
                  "internalType": "bytes32",
                  "name": "adminKey",
                  "type": "bytes32"
                }
              ],
              "name": "changeKey",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "ownershipAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "adminKey",
                  "type": "bytes32"
                }
              ],
              "name": "depositExistedToken",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "ownershipAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "uri",
                  "type": "string"
                },
                {
                  "internalType": "bool",
                  "name": "isFreeze",
                  "type": "bool"
                },
                {
                  "internalType": "bytes32",
                  "name": "adminKey",
                  "type": "bytes32"
                }
              ],
              "name": "depositNonExistedToken",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "ownershipAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "newR",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "newS",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes1",
                  "name": "newV",
                  "type": "bytes1"
                },
                {
                  "internalType": "bytes32",
                  "name": "adminKey",
                  "type": "bytes32"
                }
              ],
              "name": "list",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "uint256[]",
                  "name": "",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "",
                  "type": "uint256[]"
                },
                {
                  "internalType": "bytes",
                  "name": "",
                  "type": "bytes"
                }
              ],
              "name": "onERC1155BatchReceived",
              "outputs": [
                {
                  "internalType": "bytes4",
                  "name": "",
                  "type": "bytes4"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "",
                  "type": "bytes"
                }
              ],
              "name": "onERC1155Received",
              "outputs": [
                {
                  "internalType": "bytes4",
                  "name": "",
                  "type": "bytes4"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "",
                  "type": "bytes"
                }
              ],
              "name": "onERC721Received",
              "outputs": [
                {
                  "internalType": "bytes4",
                  "name": "",
                  "type": "bytes4"
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
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
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
              "inputs": [],
              "name": "unpause",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "ownershipAddress",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "receiver",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "adminKey",
                  "type": "bytes32"
                }
              ],
              "name": "withdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "stateMutability": "payable",
              "type": "receive"
            }
          ],
        "0x24ca06C28e5da7E30617cD99cfa94567652a4664"
    )

    console.log("instance",instance)

    let data = await instance.readFunc("EBS_CHAIN_MANAGER",[],"0x73092Bf0134CC1a74a2d25DEAd432d2708cde8Da");

    console.log("data",data)
}

main()