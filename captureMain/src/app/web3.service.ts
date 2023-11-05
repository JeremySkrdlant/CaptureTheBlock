import { Injectable } from '@angular/core';
import { ethers, Contract, Signer, BrowserProvider } from 'ethers';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import MyToken from '../artifacts/contracts/TechExpo.sol/MyToken.json';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  stepNumber = 1;
  provider?: BrowserProvider;
  contract?: Contract;
  signer?: Signer;
  walletStatus = "Install Metamask"
  contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  //Stats for main console.
  fullAddress = "0"
  condensedAddress = "0x00"
  tokenBalance = 0
  tokenSymbol = "..."
  ethBalance = "0"
  isFrozen = false;
  isOwner = false;
  currentOwner = "0"



  constructor() {
    this.checkForSuccessfulWallet();

  }

  async captureBlock() {
    const config = { dictionaries: [starWars] }
    const characterName: string = uniqueNamesGenerator(config);
    if (this.contract) {
      //This calls the updateName function on the contract. 
      //It passes the characterName variable in as a parameter. 
      await this.contract["updateName"](characterName);
      setTimeout(() => {
        this.getStats();
      }, 500)
    }
  }


  async claimTokenReward() {
    if (this.contract) {
      //this calls the collectToken function on the 
      //contract. It takes no parameters.
      await this.contract["collectToken"]()
    }
  }

  async freezeCompetitor() {
    //change this to the person you want to freeze
    //They will not be able to interact with this contract for 
    //30 seconds. 
    let competitorAddress = "";

    if (this.contract) {
      //Call the function attackUser
      //pass in the competitorAddress as a parameter.

      //replace this alert
      alert("This button is broken, you can fix it by adding code to web3.service.ts line 57.")
    }
  }

  async eventListeners() {
    if (this.contract) {
      this.contract.on("NewOwner", async (owner, name: string) => {
        console.log("We have a new owner", owner);
        this.currentOwner = owner;
        if (this.currentOwner == this.fullAddress) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
      })

      this.contract.on("Freeze", async (frozenAddress: string) => {
        console.log("Freeze Coming in", frozenAddress);
        if (frozenAddress == this.fullAddress) {
          this.isFrozen = true;
          setTimeout(() => {
            this.isFrozen = false;
          }, 30000)
        }
      })
    }
  }

  async checkForSuccessfulWallet() {
    console.log("Checking Wallet");

    //Do we have a wallet installed? 
    if ((window as any).ethereum != null) {
      this.provider = new ethers.BrowserProvider((window as any).ethereum);

      let rpc = (await this.provider.getNetwork()).toJSON();

      //Are we on an approved network?
      if (rpc.chainId == 31337) {
        this.walletStatus = "Correctly Connected"
        try {
          this.signer = await this.provider!.getSigner();
          this.contract = new ethers.Contract(this.contractAddress, MyToken.abi, this.signer);
          this.eventListeners();
          this.fullAddress = await this.signer.getAddress();
          if (await this.provider.getBalance(this.fullAddress) > 0) {
            this.stepNumber = 2;
          }
        } catch (error) {
          console.log("connecting wallet", error);
          alert("We need to connect in order to continue")
        }
      } else {
        this.walletStatus = "Connect To Correct Network"
      }

    } else {
      this.walletStatus = "Install Metamask";
    }
  }

  async getMoneyFromTheFaucet() {
    if (this.signer) {
      try {
        await fetch(`http://localhost:3000/faucet/${this.fullAddress}`)
        this.stepNumber = 2;
      } catch (error) {
        console.log("Faucet -", error);
      }
    }
  }

  async getStats() {
    console.log("Our Stats ============================");

    if (this.provider && this.signer && this.contract) {
      let address = await this.signer.getAddress();
      let start = address.slice(0, 10);
      let end = address.slice(-10);
      this.condensedAddress = start + "..." + end;
      console.log(this.condensedAddress);

      try {
        this.tokenBalance = Number(await this.contract["balanceOf"](address));
        console.log(this.tokenBalance);
      } catch (error) {
        console.log("Error getting Token Balance", error);

      }



      this.tokenSymbol = await this.contract["symbol"]();

      this.ethBalance = Math.floor(Number(await this.provider.getBalance(address)) / Math.pow(10, 18)).toString();

      let lastFreeze = await this.contract["freezeTimes"](address);
      let blockTime = (await this.provider.getBlock("latest"))?.timestamp;
      if (blockTime) {
        let difference = Number(blockTime) - Number(lastFreeze)
        console.log("Time since change ", difference, "block", Number(blockTime), "freeze", Number(lastFreeze));

        if (difference < 30) {
          this.isFrozen = true;
          setTimeout(() => {
            this.isFrozen = false;
          }, difference * 1000)
        } else {
          this.isFrozen = false;
        }
      }

      this.currentOwner = await this.contract["lastUpdater"]();
      if (this.currentOwner == address) {
        this.isOwner = true;
      }
    }
  }


}
