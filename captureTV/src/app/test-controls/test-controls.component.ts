import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-test-controls',
  templateUrl: './test-controls.component.html',
  styleUrls: ['./test-controls.component.css']
})
export class TestControlsComponent implements OnInit {

  @Input() addressToFreeze = "";

  constructor(public web3: Web3Service) { }

  ngOnInit(): void {
  }

  freezeAccount() {
    console.log("Freezing account", this.addressToFreeze);
    this.web3.testFreezing(this.addressToFreeze);
  }
}
