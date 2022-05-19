import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  delay,
  EMPTY,
  map,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import {
  BlockData,
  BlockStatus,
} from 'src/app/modules/shared/components/block/block.component';
import * as uuid from 'uuid';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css'],
})
export class CombineLatestComponent implements OnInit, OnDestroy {
  private _firstProduct = new Subject<BlockData>();
  private _secondProduct = new Subject<BlockData>();
  private _thirdProduct = new Subject<BlockData>();
  private _destroy = new Subject<boolean>();

  value1 = 1;
  value2 = 1;
  value3 = 1;
  results: BlockData[][] = [];
  pendingResults: BlockData[] = [];

  constructor() {}

  ngOnInit() {
    this.startCombineLatest();
  }

  ngOnDestroy() {
    this._destroy.next(true);
  }

  add(productNumber: number) {
    let block: BlockData = {
      id: uuid.v4(),
      startAt: new Date(),
      status: BlockStatus.PENDING,
    };
    switch (productNumber) {
      case 1:
        this._firstProduct.next({
          ...block,
          text: 'First Product',
          value: `Version ${this.value1++}`,
          deley: 1_000,
        });
        break;
      case 2:
        this._secondProduct.next({
          ...block,
          text: 'Second Product',
          value: `Version ${this.value2++}`,
          deley: 2_000,
        });
        break;
      case 3:
        this._thirdProduct.next({
          ...block,
          text: 'Third Product',
          value: `Version ${this.value3++}`,
          deley: 4_000,
        });
    }
  }

  startCombineLatest() {
    combineLatest([
      this.productObservable(1),
      this.productObservable(2),
      this.productObservable(3),
    ])
      .pipe(takeUntil(this._destroy))
      .subscribe((values) => {
        this.results.push(values);
        values.forEach((block) => {
          this.pendingResults = this.pendingResults.filter(
            (item) => item.id !== block.id
          );
        });
      });
  }

  productObservable(productNumber: number) {
    let secounds = 0;
    let productSubject: Subject<BlockData>;
    switch (productNumber) {
      case 1:
        secounds = 1_000;
        productSubject = this._firstProduct;
        break;
      case 2:
        secounds = 2_000;
        productSubject = this._secondProduct;
        break;
      case 3:
        secounds = 4_000;
        productSubject = this._thirdProduct;
        break;
      default:
        productSubject = null;
    }

    if (!productSubject) {
      return EMPTY;
    }

    return productSubject.pipe(
      tap((block) => {
        this.pendingResults.push(block);
      }),
      delay(secounds),
      map((block: BlockData) => {
        return { ...block, status: BlockStatus.EXECUTED, endAt: new Date() };
      })
    );
  }
}
