import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {

  constructor(public web3: Web3Service) {
    web3.getStats();
  }

  ngOnInit(): void {
  }

  captureBlock() {
    let audio = new Audio();
    audio.src = "../../assets/easySound.mp3";
    audio.load();
    audio.play();
    this.web3.captureBlock();
  }

}
