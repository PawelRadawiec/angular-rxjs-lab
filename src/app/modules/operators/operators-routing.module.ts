import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForkJoinComponent } from './components/operators/combinations/fork-join/fork-join.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { MergeMapComponent } from './components/operators/transformations/merge-map/merge-map.component';
import { TransformationsComponent } from './components/operators/transformations/transformations.component';
import { WithLatestFromComponent } from './components/operators/combinations/with-latest-from/with-latest-from.component';
import { CombinationsComponent } from './components/operators/combinations/combinations.component';
import { CombineLatestComponent } from './components/operators/combinations/combine-latest/combine-latest.component';
import { ConcatComponent } from './components/operators/combinations/concat/concat.component';
import { ZipComponent } from './components/operators/combinations/zip/zip.component';

const routes: Routes = [
  {
    path: 'operators',
    component: OperatorsComponent,
    children: [
      {
        path: 'combinations',
        component: CombinationsComponent,
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
          {
            path: 'zip',
            component: ZipComponent,
          },
        ],
      },
      {
        path: 'transformation',
        component: TransformationsComponent,
        children: [
          {
            path: 'merge-map',
            component: MergeMapComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorsRoutingModule {}
