import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  instructions = "";
  instructions2 = "";
  instructions3 = "";
  fullInstructions = "We need a wallet! Open a new browser tab and go to metamask.io and install a wallet.  It will be a chrome extension and will require you to create a new wallet.  Ask one of the helpers if you get stuck. Reload this page once you have metamask installed."
  fullInstructions2 = "Now we need to join the correct network.  Go into your extensions, click metamask, choose networks on the upper left side, Choose add a network. Go to the far bottom and choose Add Custom Network. Then put in the following stats."
  fullInstructions3 = "You need money to make money. We will give you some starter cash using a tool that is known as a faucet.  They do not exist on the main net but they are common on test networks so that you can debug your code. "

  networkName = "checking"
  networkRPC = "..."
  showTable = false;

  async typeOut(fullText: string, changeNumber: number): Promise<void> {
    return new Promise((response) => {
      let character = 0;
      let timer = setInterval(() => {
        let newOne = fullText.charAt(character);
        if (changeNumber == 1) {
          this.instructions += newOne;
        }
        if (changeNumber == 2) {
          this.instructions2 += newOne;
        }
        if (changeNumber == 3) {
          this.instructions3 += newOne;
        }

        character += 1;
        if (character > fullText.length) {
          response();
          clearInterval(timer);
        }
      }, 80)
    })

  }

  async getChosenNetwork() {
    let result = await fetch("http://localhost:3000/getNetwork");
    let json = await result.json();
    this.networkName = json.name;
    this.networkRPC = json.rpc;
  }

  constructor(public web3: Web3Service) {
    this.typeOut(this.fullInstructions, 1);
    this.typeOut(this.fullInstructions2, 2)
      .then(() => {
        this.showTable = true;
      })
    this.getChosenNetwork();
  }

  verify() {
    this.instructions3 = "";
    this.web3.checkForSuccessfulWallet()
    this.typeOut(this.fullInstructions3, 3);
  }

  ngOnInit(): void {
  }

}
