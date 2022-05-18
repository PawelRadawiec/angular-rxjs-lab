import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcatComponent } from 'src/app/modules/operators/components/concat/concat.component';
import { OperatorsComponent } from './components/operators/operators.component';

const routes: Routes = [
  {
    path: 'operators',
    component: OperatorsComponent,
    children: [
      {
        path: 'concat',
        component: ConcatComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorsRoutingModule {}
