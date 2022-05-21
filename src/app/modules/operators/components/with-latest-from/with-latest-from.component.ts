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
import { ForkJoinHelperService } from '../../services/fork-join-helper.service';

@Component({
  selector: 'app-with-latest-from',
  templateUrl: './with-latest-from.component.html',
  styleUrls: ['./with-latest-from.component.css'],
  providers: [ForkJoinHelperService],
})
export class WithLatestFromComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<boolean>();

  info =
    'Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.';

  showHistory = false;
  resultsHistory: BlockData[][] = [];
  results: BlockData[] = [];

  constructor(public productService: ForkJoinHelperService) {}

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
