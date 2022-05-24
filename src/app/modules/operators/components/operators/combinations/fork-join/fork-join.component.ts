import { Component, OnInit } from '@angular/core';
import { BlockDataHelperService } from '../../../../services/block-data-helper.service';
import {
  HeaderOperatorsDataService,
  OperatorRouterNames,
} from '../../../../services/header-operators-data.service';
import { OperatorsHeaderConfig } from '../../../operators-header/operators-header.component';
import { OperatorsConfig } from '../with-latest-from/with-latest-from.component';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css'],
  providers: [BlockDataHelperService, HeaderOperatorsDataService],
})
export class ForkJoinComponent implements OnInit, OperatorsConfig {
  config: OperatorsHeaderConfig;

  constructor(
    public blockDataHelper: BlockDataHelperService,
    private headerConfig: HeaderOperatorsDataService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.start();
  }

  start() {
    this.blockDataHelper.startForkJoin();
  }

  setConfig() {
    this.config = this.headerConfig.getConfiguration(
      OperatorRouterNames.FORK_JOIN
    );
  }
}
