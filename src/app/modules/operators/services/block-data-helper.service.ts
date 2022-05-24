import { Injectable, OnDestroy } from '@angular/core';
import {
  Subject,
  tap,
  delay,
  map,
  take,
  takeUntil,
  zip,
  withLatestFrom,
  forkJoin,
} from 'rxjs';
import {
  BlockData,
  BlockStatus,
} from '../../shared/components/block/block.component';
import * as uuid from 'uuid';

@Injectable()
export class BlockDataHelperService implements OnDestroy {
  private _value1 = 1;
  private _value2 = 1;
  private _value3 = 1;
  private _firstProduct = new Subject<BlockData>();
  private _secondProduct = new Subject<BlockData>();
  private _thirdProduct = new Subject<BlockData>();
  private _destroy$ = new Subject<boolean>();

  results: BlockData[] = [];
  resultsHistory: BlockData[][] = [];
  pendingResults: BlockData[] = [];

  constructor() {}

  ngOnDestroy() {
    this._destroy$.next(true);
  }

  appendPendingResults(block: BlockData) {
    this.pendingResults.push(block);
  }

  changeBlockData(block: BlockData) {
    return { ...block, status: BlockStatus.EXECUTED, endAt: new Date() };
  }

  commonBlockData(): BlockData {
    return {
      id: uuid.v4(),
      startAt: new Date(),
      status: BlockStatus.PENDING,
    };
  }

  emitFirst() {
    this._firstProduct.next({
      ...this.commonBlockData(),
      text: 'Frist Product',
      value: `Version ${this._value1++}`,
      deley: 2_000,
    });
  }

  emitSecond() {
    this._secondProduct.next({
      ...this.commonBlockData(),
      text: 'Second Product',
      value: `Version ${this._value2++}`,
      deley: 3_000,
    });
  }

  emitThird() {
    this._thirdProduct.next({
      ...this.commonBlockData(),
      text: 'Third Product',
      value: `Version ${this._value3++}`,
      deley: 5_000,
    });
  }

  firstProductObservable(setTake?: number) {
    return this._firstProduct.asObservable().pipe(
      tap((block) => this.appendPendingResults(block)),
      delay(2_000),
      map((block) => this.changeBlockData(block)),
      setTake ? take(setTake) : tap()
    );
  }
  secondProductObservable(setTake?: number) {
    return this._secondProduct.asObservable().pipe(
      tap((block) => this.appendPendingResults(block)),
      delay(3_000),
      map((block) => this.changeBlockData(block)),
      setTake ? take(setTake) : tap()
    );
  }
  thirdProductObservable(setTake?: number) {
    return this._thirdProduct.asObservable().pipe(
      tap((block) => this.appendPendingResults(block)),
      delay(5_000),
      map((block) => this.changeBlockData(block)),
      setTake ? take(setTake) : tap()
    );
  }

  startZip() {
    zip(
      this.firstProductObservable(),
      this.secondProductObservable(),
      this.thirdProductObservable()
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe((values) => {
        this.results = values;
        this.resultsHistory.push(values);
        values.forEach((block) => {
          this.pendingResults = this.pendingResults.filter(
            (item) => item.id !== block.id
          );
        });
      });
  }

  startWithLatestFrom() {
    const firstSource = this.firstProductObservable();
    const secondSource = this.secondProductObservable();
    firstSource
      .pipe(withLatestFrom(secondSource), takeUntil(this._destroy$))
      .subscribe((products) => {
        this.pendingResults = [];
        this.results = products;
        this.resultsHistory.push(products);
      });
  }

  startForkJoin() {
    forkJoin([
      this.firstProductObservable(1),
      this.secondProductObservable(1),
      this.thirdProductObservable(1),
    ])
      .pipe(takeUntil(this._destroy$))
      .subscribe((products) => {
        this.results = products;
        this.resultsHistory.push(products);

        products.forEach((block) => {
          this.pendingResults = this.pendingResults.filter(
            (item) => item.id !== block.id
          );
        });
      });
  }
}
