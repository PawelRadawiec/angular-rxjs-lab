import { Component, OnInit } from '@angular/core';
import { BlockDataHelperService } from '../../services/block-data-helper.service';
import {
  HeaderOperatorsDataService,
  OperatorRouterNames,
} from '../../services/header-operators-data.service';
import { OperatorsHeaderConfig } from '../operators-header/operators-header.component';
import { OperatorsConfig } from '../with-latest-from/with-latest-from.component';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css'],
  providers: [BlockDataHelperService, HeaderOperatorsDataService],
})
export class ZipComponent implements OnInit, OperatorsConfig {
  config: OperatorsHeaderConfig;
  showHistory = false;

  constructor(
    public blockDataHelper: BlockDataHelperService,
    private headerData: HeaderOperatorsDataService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.start();
  }

  start() {
    this.blockDataHelper.startZip();
  }

  setConfig() {
    this.config = this.headerData.getConfiguration(OperatorRouterNames.ZIP);
    this.config.buttons.push({
      name: 'Show history',
      callback: () => {
        this.showHistory = !this.showHistory;
      },
    });
  }
}
