import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-your-tokens',
  templateUrl: './your-tokens.component.html',
  styleUrls: ['./your-tokens.component.css']
})
export class YourTokensComponent implements OnInit {

  constructor(public web3: Web3Service) { }

  ngOnInit(): void {
  }

}
