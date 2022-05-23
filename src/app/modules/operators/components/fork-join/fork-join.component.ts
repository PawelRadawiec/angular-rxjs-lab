import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, forkJoin, map, Subject, takeUntil, tap } from 'rxjs';
import { BlockData } from 'src/app/modules/shared/components/block/block.component';
import { BlockDataHelperService } from '../../services/block-data-helper.service';
import {
  HeaderOperatorsDataService,
  OperatorRouterNames,
} from '../../services/header-operators-data.service';
import { OperatorsHeaderConfig } from '../operators-header/operators-header.component';
import { OperatorsConfig } from '../with-latest-from/with-latest-from.component';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css'],
  providers: [BlockDataHelperService, HeaderOperatorsDataService],
})
export class ForkJoinComponent implements OnInit, OnDestroy, OperatorsConfig {
  config: OperatorsHeaderConfig;
  showHistory = false;
  results: BlockData[] = [];
  resultsHistory: BlockData[][] = [];
  private _destroy = new Subject<boolean>();

  constructor(
    public blockDataHelper: BlockDataHelperService,
    private headerConfig: HeaderOperatorsDataService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.start();
  }

  ngOnDestroy() {
    this._destroy.next(true);
  }

  start() {
    forkJoin([
      this.blockDataHelper.firstProductObservable(1),
      this.blockDataHelper.secondProductObservable(1),
      this.blockDataHelper.thirdProductObservable(1),
    ])
      .pipe(takeUntil(this._destroy))
      .subscribe((products) => {
        this.results = products;
        this.resultsHistory.push(products);

        products.forEach((block) => {
          this.blockDataHelper.pendingResults =
            this.blockDataHelper.pendingResults.filter(
              (item) => item.id !== block.id
            );
        });
      });
  }

  setConfig() {
    this.config = this.headerConfig.getConfiguration(
      OperatorRouterNames.FORK_JOIN
    );
  }
}
