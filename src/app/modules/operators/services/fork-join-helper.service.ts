import { Injectable } from '@angular/core';
import { Subject, tap, delay, map, take } from 'rxjs';
import {
  BlockData,
  BlockStatus,
} from '../../shared/components/block/block.component';
import * as uuid from 'uuid';

@Injectable()
export class ForkJoinHelperService {
  private _value1 = 1;
  private _value2 = 1;
  private _value3 = 1;
  private _firstProduct = new Subject<BlockData>();
  private _secondProduct = new Subject<BlockData>();
  private _thirdProduct = new Subject<BlockData>();

  pendingResults: BlockData[] = [];

  constructor() {}

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
}
