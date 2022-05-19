import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ForkJoinHelperService } from '../../services/fork-join-helper.service';

import { ForkJoinComponent } from './fork-join.component';

fdescribe('ForkJoinComponent', () => {
  let component: ForkJoinComponent;
  let fixture: ComponentFixture<ForkJoinComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForkJoinComponent],
      providers: [ForkJoinHelperService],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ForkJoinComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit three values', fakeAsync(() => {
    const buttons = el.queryAll(By.css('button'));

    expect(buttons.length).toBe(3);
    buttons.forEach((button) => {
      button.triggerEventHandler('click', null);
    });
    tick(8_000);

    expect(component.results.length).toBe(3);
  }));

  it('should not emit values', fakeAsync(() => {
    const buttons = el.queryAll(By.css('button'));

    expect(buttons.length).toBe(3);
    buttons[0].triggerEventHandler('click', null);
    buttons[1].triggerEventHandler('click', null);
    tick(5_000);

    expect(component.results.length).toBe(0);
  }));
});
