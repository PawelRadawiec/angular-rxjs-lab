import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { BlockData } from 'src/app/modules/shared/components/block/block.component';
import { BlockDataHelperService } from '../../services/block-data-helper.service';
import {
  HeaderOperatorsDataService,
  OperatorRouterNames,
} from '../../services/header-operators-data.service';
import { OperatorsHeaderConfig } from '../operators-header/operators-header.component';
import { OperatorsConfig } from '../with-latest-from/with-latest-from.component';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css'],
  providers: [BlockDataHelperService, HeaderOperatorsDataService],
})
export class CombineLatestComponent
  implements OnInit, OnDestroy, OperatorsConfig
{
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
    combineLatest([
      this.blockDataHelper.firstProductObservable(),
      this.blockDataHelper.secondProductObservable(),
      this.blockDataHelper.thirdProductObservable(),
    ])
      .pipe(takeUntil(this._destroy))
      .subscribe((values) => {
        this.results = values;
        this.resultsHistory.push(values);
        values.forEach((block) => {
          this.blockDataHelper.pendingResults =
            this.blockDataHelper.pendingResults.filter(
              (item) => item.id !== block.id
            );
        });
      });
  }

  setConfig() {
    this.config = this.headerConfig.getConfiguration(
      OperatorRouterNames.COMBINE_LATEST
    );
    this.config.buttons.push({
      name: 'Show history',
      callback: () => {
        this.showHistory = !this.showHistory;
      },
    });
  }
}
