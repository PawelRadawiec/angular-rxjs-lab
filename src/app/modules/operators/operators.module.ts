import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorsRoutingModule } from './operators-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OperatorsComponent } from './components/operators/operators.component';
import { ConcatComponent } from './components/concat/concat.component';

@NgModule({
  declarations: [OperatorsComponent, ConcatComponent],
  imports: [CommonModule, OperatorsRoutingModule, SharedModule],
  exports: [OperatorsComponent, ConcatComponent],
})
export class OperatorsModule {}
