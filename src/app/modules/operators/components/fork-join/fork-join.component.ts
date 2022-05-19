import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, forkJoin, map, Subject, takeUntil, tap } from 'rxjs';
import { BlockData } from 'src/app/modules/shared/components/block/block.component';
import { ForkJoinHelperService } from '../../services/fork-join-helper.service';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css'],
})
export class ForkJoinComponent implements OnInit, OnDestroy {
  showHistory = false;
  results: BlockData[] = [];
  resultsHistory: BlockData[][] = [];
  private _destroy = new Subject<boolean>();

  constructor(public forkJoinHelper: ForkJoinHelperService) {}

  ngOnInit() {
    this.startForkJoin();
  }

  startForkJoin() {
    forkJoin([
      this.forkJoinHelper.firstProductObservable(),
      this.forkJoinHelper.secondProductObservable(),
      this.forkJoinHelper.thirdProductObservable(),
    ])
      .pipe(takeUntil(this._destroy))
      .subscribe((products) => {
        this.results = products;
        this.resultsHistory.push(products);

        products.forEach((block) => {
          this.forkJoinHelper.pendingResults =
            this.forkJoinHelper.pendingResults.filter(
              (item) => item.id !== block.id
            );
        });
      });
  }

  ngOnDestroy() {
    this._destroy.next(true);
  }
}
