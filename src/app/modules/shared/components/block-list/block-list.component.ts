import { Component, Input, OnInit } from '@angular/core';
import { BlockData } from '../block/block.component';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css'],
})
export class BlockListComponent implements OnInit {
  @Input() blocks: BlockData[];
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
