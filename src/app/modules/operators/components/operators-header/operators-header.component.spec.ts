import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorsHeaderComponent } from './operators-header.component';

describe('OperatorsHeaderComponent', () => {
  let component: OperatorsHeaderComponent;
  let fixture: ComponentFixture<OperatorsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
