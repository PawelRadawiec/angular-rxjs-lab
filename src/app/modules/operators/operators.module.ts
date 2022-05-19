import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorsRoutingModule } from './operators-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OperatorsComponent } from './components/operators/operators.component';
import { ConcatComponent } from './components/concat/concat.component';
import { CombineLatestComponent } from './components/combine-latest/combine-latest.component';
import { ForkJoinComponent } from './components/fork-join/fork-join.component';
import { ForkJoinHelperService } from './services/fork-join-helper.service';

@NgModule({
  declarations: [
    OperatorsComponent,
    ConcatComponent,
    CombineLatestComponent,
    ForkJoinComponent,
  ],
  imports: [CommonModule, OperatorsRoutingModule, SharedModule],
  exports: [OperatorsComponent, ConcatComponent],
  providers: [ForkJoinHelperService],
})
export class OperatorsModule {}
