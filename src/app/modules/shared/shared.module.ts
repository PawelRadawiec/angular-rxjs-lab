import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BlockComponent } from './components/block/block.component';
import { BlockListComponent } from './components/block-list/block-list.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';

@NgModule({
  declarations: [BlockComponent, BlockListComponent, InfoBoxComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [
    BlockComponent,
    MatButtonModule,
    MatIconModule,
    BlockListComponent,
    InfoBoxComponent,
  ],
})
export class SharedModule {}
