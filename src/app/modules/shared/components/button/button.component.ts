import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() loading = false;
  @Input() title: string;
  @Output() clickEvent$ = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  click() {
    if (!this.loading) {
      this.clickEvent$.emit();
    }
  }
}
