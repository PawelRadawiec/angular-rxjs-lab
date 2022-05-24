import { Component, OnInit } from '@angular/core';
import { BlockDataHelperService } from '../../services/block-data-helper.service';
import {
  HeaderOperatorsDataService,
  OperatorRouterNames,
} from '../../services/header-operators-data.service';
import { OperatorsHeaderConfig } from '../operators-header/operators-header.component';
import { OperatorsConfig } from '../with-latest-from/with-latest-from.component';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css'],
  providers: [BlockDataHelperService, HeaderOperatorsDataService],
})
export class ConcatComponent implements OnInit, OperatorsConfig {
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
    this.blockDataHelper.startConcat();
  }

  setConfig() {
    this.config = this.headerConfig.getConfiguration(
      OperatorRouterNames.CONCAT
    );
  }
}
