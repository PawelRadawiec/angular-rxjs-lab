import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcatComponent } from 'src/app/modules/operators/components/concat/concat.component';
import { CombineLatestComponent } from './components/combine-latest/combine-latest.component';
import { ForkJoinComponent } from './components/fork-join/fork-join.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { WithLatestFromComponent } from './components/with-latest-from/with-latest-from.component';

const routes: Routes = [
  {
    path: 'operators',
    component: OperatorsComponent,
    children: [
      {
        path: 'concat',
        component: ConcatComponent,
      },
      {
        path: 'combine-latest',
        component: CombineLatestComponent,
      },
      {
        path: 'fork-join',
        component: ForkJoinComponent,
      },
      {
        path: 'with-latest-from',
        component: WithLatestFromComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorsRoutingModule {}
