import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-block-stat-view',
  templateUrl: './block-stat-view.component.html',
  styleUrls: ['./block-stat-view.component.css']
})
export class BlockStatViewComponent implements OnInit {

  constructor(public web3: Web3Service) { }

  ngOnInit(): void {
  }

}
