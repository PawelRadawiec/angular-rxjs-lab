import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorsRoutingModule } from './operators-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OperatorsComponent } from './components/operators/operators.component';
import { ConcatComponent } from './components/concat/concat.component';
import { CombineLatestComponent } from './components/combine-latest/combine-latest.component';
import { ForkJoinComponent } from './components/fork-join/fork-join.component';
import { BlockDataHelperService } from './services/block-data-helper.service';
import { WithLatestFromComponent } from './components/with-latest-from/with-latest-from.component';
import { OperatorsHeaderComponent } from './components/operators-header/operators-header.component';
import { ZipComponent } from './components/zip/zip.component';

@NgModule({
  declarations: [
    OperatorsComponent,
    ConcatComponent,
    CombineLatestComponent,
    ForkJoinComponent,
    WithLatestFromComponent,
    OperatorsHeaderComponent,
    ZipComponent,
  ],
  imports: [CommonModule, OperatorsRoutingModule, SharedModule],
  exports: [OperatorsComponent, ConcatComponent],
  providers: [BlockDataHelperService],
})
export class OperatorsModule {}
