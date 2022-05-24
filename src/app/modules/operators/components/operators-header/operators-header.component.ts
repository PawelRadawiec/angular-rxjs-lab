import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface OperatorsHeaderButton {
  name: string;
  callback: any;
  loading?: Observable<boolean>;
}

export interface OperatorsHeaderConfig {
  title: string;
  info: string;
  buttons: OperatorsHeaderButton[];
}

@Component({
  selector: 'app-operators-header',
  templateUrl: './operators-header.component.html',
  styleUrls: ['./operators-header.component.css'],
})
export class OperatorsHeaderComponent implements OnInit {
  @Input() config: OperatorsHeaderConfig;

  constructor() {}

  ngOnInit() {}

  handleClick(button: OperatorsHeaderButton) {
    button.callback();
  }
}
