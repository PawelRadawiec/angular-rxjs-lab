import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  from,
  map,
  merge,
  Subject,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { BlockData } from 'src/app/modules/shared/components/block/block.component';
import { BlockDataHelperService } from '../../services/block-data-helper.service';
import { OperatorsHeaderConfig } from '../operators-header/operators-header.component';

@Component({
  selector: 'app-with-latest-from',
  templateUrl: './with-latest-from.component.html',
  styleUrls: ['./with-latest-from.component.css'],
  providers: [BlockDataHelperService],
})
export class WithLatestFromComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<boolean>();

  info =
    'Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.';

  config: OperatorsHeaderConfig = {
    info: this.info,
    title: 'withLatestFrom',
    buttons: [
      {
        name: 'Source',
        callback: () => {
          this.productService.emitFirst();
        },
      },
      {
        name: 'Inner',
        callback: () => {
          this.productService.emitSecond();
        },
      },
    ],
  };
  showHistory = false;
  resultsHistory: BlockData[][] = [];
  results: BlockData[] = [];

  constructor(public productService: BlockDataHelperService) {}

  ngOnInit() {
    this.startWithLatestFrom();
  }

  ngOnDestroy() {
    this._destroy$.next(true);
  }

  startWithLatestFrom() {
    const firstSource = this.productService.firstProductObservable();
    const secondSource = this.productService.secondProductObservable();
    firstSource
      .pipe(
        tap((block) => {}),
        withLatestFrom(secondSource),
        takeUntil(this._destroy$)
      )
      .subscribe((products) => {
        this.productService.pendingResults = [];
        this.results = products;
        this.resultsHistory.push(products);
      });
  }
}
