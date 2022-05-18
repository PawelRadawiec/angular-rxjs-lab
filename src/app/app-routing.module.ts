import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcatComponent } from './components/concat/concat.component';

const routes: Routes = [
  {
    path: 'concat',
    component: ConcatComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
