import { Component, OnInit } from '@angular/core';
import { concat, delay, map, merge, of, Subject, tap } from 'rxjs';
import { BlockData, BlockStatus } from '../block/block.component';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css'],
})
export class ConcatComponent implements OnInit {
  value = 1;
  subject = new Subject<BlockData>();

  pendingBlocks: BlockData[] = [];
  executedBlocks: BlockData[] = [];

  constructor() {}

  ngOnInit() {}

  start() {
    this.useConcat();
  }

  useConcat() {
    concat(
      this.getData('Order 1', 2_000),
      this.getData('Order 2', 4_000),
      this.getData('Order 3', 6_000)
    ).subscribe((block) => {
      this.executedBlocks.push({
        ...block,
        status: BlockStatus.EXECUTED,
        endAt: new Date(),
      });
    });
  }

  getData(text: string, deley: number) {
    return of({
      text,
      value: this.value++,
      status: BlockStatus.PENDING,
      deley,
    }).pipe(
      map((data: BlockData) => {
        const block = { ...data, startAt: new Date() };
        this.pendingBlocks.push(block);
        return block;
      }),
      delay(deley)
    );
  }
}
