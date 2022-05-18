import { Component, Input, OnInit } from '@angular/core';

export enum BlockStatus {
  PENDING = 'PENDING',
  EXECUTED = 'EXECUTED',
}

export interface BlockData {
  text?: string;
  value?: number | string;
  status?: BlockStatus;
  deley?: number;
  startAt?: any;
  endAt?: any;
}

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
})
export class BlockComponent implements OnInit {
  @Input() block: BlockData;

  constructor() {}

  ngOnInit() {}
}
