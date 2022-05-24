import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export enum BlockStatus {
  PENDING = 'PENDING',
  EXECUTED = 'EXECUTED',
}

export interface BlockData {
  id?: string;
  text?: string;
  value?: number | string;
  status?: BlockStatus;
  deley?: number;
  startAt?: any;
  endAt?: any;
  loading?: boolean;
}

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
})
export class BlockComponent implements OnInit {
  @Input() block: BlockData;

  counter: number;

  constructor() {}

  ngOnInit() {
    this.countdown();
  }

  countdown() {
    if (this.block.status !== BlockStatus.PENDING) {
      return;
    }
    this.counter = this.block.deley;
    const interval = setInterval(() => {
      if (this.counter <= 0) {
        clearInterval(interval);
      } else {
        this.counter -= 1_000;
      }
    }, 1_000);
  }
}
