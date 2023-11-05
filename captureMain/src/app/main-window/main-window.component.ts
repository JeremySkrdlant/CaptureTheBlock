import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {

  constructor(public web3: Web3Service) {
    setTimeout(() => {
      web3.getStats();
    }, 1000)
  }

  ngOnInit(): void {
  }

  captureBlock() {

    let audio = new Audio();
    audio.src = "../../assets/easySound.mp3";
    audio.load();
    audio.play();

    if (this.web3.isOwner) {
      console.log("We are claiming our reward")
      this.web3.claimTokenReward();
    } else {
      console.log("We are capturing the Block")
      this.web3.captureBlock();
    }


  }

}
