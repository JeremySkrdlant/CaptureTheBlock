import express from 'express';
import cors from 'cors'; 
import {ethers} from 'ethers'; 
import MyToken from './artifacts/contracts/TechExpo.sol/MyToken.json' assert {type:"json"}


const app = express();
app.use(cors());

let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
let server1Address = "http://localhost:8545"
let provider = new ethers.JsonRpcProvider(server1Address);
let mainWallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
let contract1 = new ethers.Contract(contractAddress, MyToken.abi, mainWallet);
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
    let startingNonce = await provider.getTransactionCount(mainWallet.address)
    const tx = await mainWallet.sendTransaction({
        nonce: startingNonce,
        to: address,
        value: ethers.parseEther("5")
    })
    await contract1["mint"](address, 10);
    isLocked = false; 
    response.send({status: "success", value:tx});
     
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