import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BlockDataHelperService } from '../../../../services/block-data-helper.service';
import {
  HeaderOperatorsDataService,
  OperatorRouterNames,
} from '../../../../services/header-operators-data.service';
import { OperatorsHeaderConfig } from '../../../operators-header/operators-header.component';

export interface OperatorsConfig {
  config: OperatorsHeaderConfig;
  start: () => void;
  setConfig: () => void;
}

@Component({
  selector: 'app-with-latest-from',
  templateUrl: './with-latest-from.component.html',
  styleUrls: ['./with-latest-from.component.css'],
  providers: [BlockDataHelperService, HeaderOperatorsDataService],
})
export class WithLatestFromComponent
  implements OnInit, OnDestroy, OperatorsConfig
{
  config: OperatorsHeaderConfig;
  showHistory = false;

  private _destroy$ = new Subject<boolean>();

  constructor(
    public blockDataHelper: BlockDataHelperService,
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
    this.blockDataHelper.startWithLatestFrom();
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
