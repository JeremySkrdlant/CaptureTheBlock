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
  server1Address = "http://10.200.0.60:8545"
  server2Address = "http://10.200.0.61:8545"
  server3Address = "http://10.200.0.62:8545"
  provider = new ethers.JsonRpcProvider(this.server1Address);
  provider2 = new ethers.JsonRpcProvider(this.server2Address);
  provider3 = new ethers.JsonRpcProvider(this.server3Address);
  mainWallet = new ethers.Wallet(environment.walletKey, this.provider);
  wallet2 = new ethers.Wallet(environment.walletKey, this.provider2);
  wallet3 = new ethers.Wallet(environment.walletKey, this.provider3);
  contract = new ethers.Contract(this.contractAddress, MyToken.abi, this.mainWallet);
  contract2 = new ethers.Contract(this.contractAddress, MyToken.abi, this.wallet2);
  contract3 = new ethers.Contract(this.contractAddress, MyToken.abi, this.wallet3);
  timer1?: NodeJS.Timeout;
  timer2?: NodeJS.Timeout;
  timer3?: NodeJS.Timeout;
  planet1?: BlockChainStat;
  planet2?: BlockChainStat;
  planet3?: BlockChainStat;



  async listenToEvents(planetNumber: number) {
    let paper = this.contract;
    let time = this.timer1;
    let planet = this.planet1;
    if (planetNumber == 2) {
      paper = this.contract2;
      time = this.timer2;
      planet = this.planet2;
    }
    if (planetNumber == 3) {
      paper = this.contract3;
      time = this.timer3;
      planet = this.planet3;
    }

    paper.on("NewOwner", (owner, name: string) => {
      console.log("We have a new Owner on Planet 1");

      if (time) {
        clearInterval(time);
      }
      setTimeout(() => {
        this.updateStats(planetNumber);
      }, 300)
      time = setInterval(() => {
        planet!.timeControlled += 1;
        if (planet!.timeControlled > 35) {
          clearInterval(this.timer1);
        }
      }, 1000)
    })

    this.contract.on("ResetOccured", () => {
      console.log("We have a reset on Planet 1");

      this.updateStats(1);
      this.updateStats(2);
      this.updateStats(3);
    })
  }

  constructor() {
    this.updateStats(1);
    this.updateStats(2);
    this.updateStats(3);
    //this.getTokens();
    this.listenToEvents(1);
    this.listenToEvents(2);
    this.listenToEvents(3);

  }

  async updateStats(planetNumber: number) {
    let paper = this.contract;
    let serverAddress = this.server1Address;
    let planet = this.planet1;
    if (planetNumber == 2) {
      paper = this.contract2;
      serverAddress = this.server2Address
      planet = this.planet2;
    }
    if (planetNumber == 3) {
      paper = this.contract3;
      serverAddress = this.server3Address;
      planet = this.planet3;
    }

    //get from network1 
    let currentName = await paper["serverName"]();

    let currentAddress = await paper["lastUpdater"]();

    let timeControlled = await paper["getTimeOwnedInSeconds"]();

    let tokenAmount = await paper["balanceOf"](currentAddress);

    let tokenSymbol = await paper["symbol"]();

    planet = { currentName: currentName, currentAddress: currentAddress, timeControlled: Number(timeControlled), serverAddress: serverAddress, tokenAmount: tokenAmount, symbol: tokenSymbol };
    if (planetNumber == 1) {
      this.planet1 = planet;
    }
    if (planetNumber == 2) {
      this.planet2 = planet;
    }
    if (planetNumber == 3) {
      this.planet3 = planet;
    }
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
