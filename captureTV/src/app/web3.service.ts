import { Injectable } from '@angular/core';
import MyToken from '../artifacts/contracts/TechExpo.sol/MyToken.json'
import { environment } from '../environments/environment'
import { ethers } from 'ethers';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  server1Address = "http://localhost:8545"
  provider = new ethers.JsonRpcProvider(this.server1Address);
  mainWallet = new ethers.Wallet(environment.walletKey, this.provider);
  contract = new ethers.Contract(this.contractAddress, MyToken.abi, this.mainWallet);
  timer1?: NodeJS.Timeout;
  planet1?: BlockChainStat;



  async listenToEvents() {
    this.contract.on("NewOwner", (owner, name: string) => {
      console.log("We have a new Owner");

      if (this.timer1) {
        clearInterval(this.timer1);
      }
      setTimeout(() => {
        this.updateStats();
      }, 300)
      this.timer1 = setInterval(() => {
        this.planet1!.timeControlled += 1;
        if (this.planet1!.timeControlled > 35) {
          clearInterval(this.timer1);
        }
      }, 1000)
    })

    this.contract.on("ResetOccured", () => {
      console.log("We have a reset");

      this.updateStats();
    })
  }

  constructor() {
    this.updateStats();
    this.getTokens();
    this.listenToEvents();
  }

  async updateStats() {
    //get from network1 
    let currentName = await this.contract["serverName"]();
    console.log(currentName);

    let currentAddress = await this.contract["lastUpdater"]();
    console.log(currentAddress);

    let timeControlled = await this.contract["getTimeOwnedInSeconds"]();

    let tokenAmount = await this.contract["balanceOf"](currentAddress);

    let tokenSymbol = await this.contract["symbol"]();

    this.planet1 = { currentName: currentName, currentAddress: currentAddress, timeControlled: Number(timeControlled), serverAddress: 'http://127.0.0.1:8545', tokenAmount: tokenAmount, symbol: tokenSymbol };
  }

  async getTokens() {
    await this.contract["mint"](await this.mainWallet.address, 20);
  }

  async testUpdateName() {
    const config = {
      dictionaries: [starWars]
    }
    const characterName: string = uniqueNamesGenerator(config);
    await this.contract["updateName"](characterName);
  }

  async testMiningCoin() {
    await this.contract["collectToken"]();
  }

  async testFreezing(address: string) {
    await this.contract["attackUser"](address)
  }

}

export interface BlockChainStat {
  currentName: string,
  currentAddress: string,
  timeControlled: number,
  serverAddress: string,
  tokenAmount: number,
  symbol: string
}
