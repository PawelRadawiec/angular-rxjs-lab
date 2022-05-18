import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, delay, map, Subject, takeUntil } from 'rxjs';
import { BlockData } from 'src/app/modules/shared/components/block/block.component';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css'],
})
export class CombineLatestComponent implements OnInit, OnDestroy {
  private _firstProduct = new Subject<BlockData>();
  private _secondProduct = new Subject<BlockData>();
  private _thirdProduct = new Subject<BlockData>();

  value1 = 1;
  value2 = 1;
  value3 = 1;

  private _destroy = new Subject();

  results: BlockData[][] = [];

  constructor() {}

  ngOnInit() {
    combineLatest([
      this._firstProduct.pipe(
        delay(1_000),
        map((block) => {
          return { ...block, endAt: new Date() };
        })
      ),
      this._secondProduct.pipe(
        delay(2_000),
        map((block) => {
          return { ...block, endAt: new Date() };
        })
      ),
      this._thirdProduct.pipe(
        delay(4_000),
        map((block) => {
          return { ...block, endAt: new Date() };
        })
      ),
    ])
      .pipe(takeUntil(this._destroy))
      .subscribe((values) => {
        this.results.push(values);
      });
  }

  ngOnDestroy() {
    this._destroy.next({});
  }

  add(value: number) {
    switch (value) {
      case 1:
        this._firstProduct.next({
          text: 'First Product',
          value: `Version ${this.value1++}`,
          startAt: new Date(),
          deley: 1_000,
        });
        break;
      case 2:
        this._secondProduct.next({
          text: 'Second Product',
          value: `Version ${this.value2++}`,
          startAt: new Date(),
          deley: 2_000,
        });
        break;
      case 3:
        this._thirdProduct.next({
          text: 'Third Product',
          value: `Version ${this.value3++}`,
          startAt: new Date(),
          deley: 4_000,
        });
        break;
    }
  }
}
