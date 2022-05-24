import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BlockComponent } from './components/block/block.component';
import { BlockListComponent } from './components/block-list/block-list.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from './components/button/button.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    BlockComponent,
    BlockListComponent,
    InfoBoxComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  exports: [
    BlockComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BlockListComponent,
    InfoBoxComponent,
    ButtonComponent,
    MatProgressBarModule,
  ],
})
export class SharedModule {}
