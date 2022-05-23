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
import {
  HeaderOperatorsDataService,
  OperatorRouterNames,
} from '../../services/header-operators-data.service';
import { OperatorsHeaderConfig } from '../operators-header/operators-header.component';

@Component({
  selector: 'app-with-latest-from',
  templateUrl: './with-latest-from.component.html',
  styleUrls: ['./with-latest-from.component.css'],
  providers: [BlockDataHelperService, HeaderOperatorsDataService],
})
export class WithLatestFromComponent implements OnInit, OnDestroy {
  config: OperatorsHeaderConfig;
  showHistory = false;
  resultsHistory: BlockData[][] = [];
  results: BlockData[] = [];

  private _destroy$ = new Subject<boolean>();

  constructor(
    public productService: BlockDataHelperService,
    private configService: HeaderOperatorsDataService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.start();
  }

  ngOnDestroy() {
    this._destroy$.next(true);
  }

  start() {
    const firstSource = this.productService.firstProductObservable();
    const secondSource = this.productService.secondProductObservable();
    firstSource
      .pipe(withLatestFrom(secondSource), takeUntil(this._destroy$))
      .subscribe((products) => {
        this.productService.pendingResults = [];
        this.results = products;
        this.resultsHistory.push(products);
      });
  }

  setConfig() {
    this.config = this.configService.getConfiguration(
      OperatorRouterNames.WITH_LATEST_FROM
    );
    this.config.buttons.push({
      name: 'Show history',
      callback: () => {
        this.showHistory = !this.showHistory;
      },
    });
  }
}
