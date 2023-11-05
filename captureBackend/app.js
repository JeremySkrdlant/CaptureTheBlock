import express from 'express';
import cors from 'cors'; 
import {ethers} from 'ethers'; 
import MyToken from './artifacts/contracts/TechExpo.sol/MyToken.json' assert {type:"json"}


const app = express();
app.use(cors());

let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
let serverAddresses = ["http://localhost:8545"]

//Setup identical servers from the server Addresses
let providers = []; 
serverAddresses.forEach((address)=>{
    let provider = new ethers.JsonRpcProvider(address);
    providers.push(provider);
})

//Set up the default hardhat wallet on each of the servers. 
let wallets = []; 
providers.forEach((provider)=>{
    let wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    wallets.push(wallet);
})

let contracts = []; 
wallets.forEach((wallet)=>{
    let contract = new ethers.Contract(contractAddress, MyToken.abi, wallet);
    contracts.push(contract);
})

//This is used to stop multiple transactions on giving out eth. 
var isLocked = false; 

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

app.get('/faucet/:address', async (request, response) => {
    const {address} = request.params;
    while (isLocked){
        await delay(1000);
    }
    isLocked = true; 

    for(var i = 0; i < serverAddresses.length; i++){
        let provider = providers[i]; 
        let wallet = wallets[i]; 
        let contract = contracts[i];
        let startingNonce = await provider.getTransactionCount(wallet.address)
        const tx = await wallet.sendTransaction({
            nonce: startingNonce,
            to: address,
            value: ethers.parseEther("5")
        })
        contract["mint"](address, 5);
        console.log("transaction on network", serverAddresses[i],tx);
    }

    isLocked = false; 
    response.send({status: "success"});
     
})

const possibleNetworks = [
    {
        name: "Home",
        rpc: "http://localhost:8545", 
    }
]

app.get('/getNetwork', (request, response) => {
    let choice = Math.floor(Math.random() * possibleNetworks.length);
    response.send(possibleNetworks[choice]); 

})

app.get('/goBackInTime', async(request, response) => {
    //reset the contract. 
     await contract1["resetContract"]()
     response.send("Worked")
})

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})