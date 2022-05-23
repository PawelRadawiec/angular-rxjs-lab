import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, delay, map, of, Subject, takeUntil } from 'rxjs';
import {
  BlockData,
  BlockStatus,
} from '../../../shared/components/block/block.component';
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
export class ConcatComponent implements OnInit, OnDestroy, OperatorsConfig {
  config: OperatorsHeaderConfig;
  value = 1;
  pendingBlocks: BlockData[] = [];
  executedBlocks: BlockData[] = [];

  destory$ = new Subject();

  constructor(
    public blockDataHelper: BlockDataHelperService,
    private headerConfig: HeaderOperatorsDataService
  ) {}

  ngOnInit() {
    this.setConfig();
  }

  ngOnDestroy(): void {
    this.destory$.next({});
  }

  start() {
    this.useConcat();
  }

  reset() {
    this.value = 1;
    this.pendingBlocks = [];
    this.executedBlocks = [];
    this.destory$.next({});
  }

  useConcat() {
    concat(
      this.getData('Order 1', 2_000),
      this.getData('Order 2', 4_000),
      this.getData('Order 3', 6_000)
    )
      .pipe(takeUntil(this.destory$))
      .subscribe((block) => {
        this.executedBlocks.push({
          ...block,
          status: BlockStatus.EXECUTED,
          endAt: new Date(),
        });
      });
  }

  getData(text: string, deley: number) {
    return of({
      text,
      value: this.value++,
      status: BlockStatus.PENDING,
      deley,
    }).pipe(
      map((data: BlockData) => {
        const block = { ...data, startAt: new Date() };
        this.pendingBlocks.push(block);
        return block;
      }),
      delay(deley)
    );
  }

  setConfig() {
    this.config = this.headerConfig.getConfiguration(
      OperatorRouterNames.CONCAT
    );
    this.config.buttons = [
      {
        name: 'Start',
        callback: () => {
          this.useConcat();
        },
      },
      {
        name: 'Reset',
        callback: () => {
          this.reset();
        },
      },
    ];
  }
}
