import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OperatorsHeaderComponent } from './components/operators-header/operators-header.component';
import { CombinationsComponent } from './components/operators/combinations/combinations.component';
import { CombineLatestComponent } from './components/operators/combinations/combine-latest/combine-latest.component';
import { ConcatComponent } from './components/operators/combinations/concat/concat.component';
import { ForkJoinComponent } from './components/operators/combinations/fork-join/fork-join.component';
import { WithLatestFromComponent } from './components/operators/combinations/with-latest-from/with-latest-from.component';
import { ZipComponent } from './components/operators/combinations/zip/zip.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { MergeMapComponent } from './components/operators/transformations/merge-map/merge-map.component';
import { TransformationsComponent } from './components/operators/transformations/transformations.component';
import { OperatorsRoutingModule } from './operators-routing.module';
import { BlockDataHelperService } from './services/block-data-helper.service';

@NgModule({
  declarations: [
    OperatorsComponent,
    ConcatComponent,
    CombineLatestComponent,
    ForkJoinComponent,
    WithLatestFromComponent,
    OperatorsHeaderComponent,
    ZipComponent,
    TransformationsComponent,
    MergeMapComponent,
    CombinationsComponent,
  ],
  imports: [CommonModule, OperatorsRoutingModule, SharedModule],
  exports: [OperatorsComponent, ConcatComponent],
  providers: [BlockDataHelperService],
})
export class OperatorsModule {}
