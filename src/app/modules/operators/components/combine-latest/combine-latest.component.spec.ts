import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockListComponent } from 'src/app/modules/shared/components/block-list/block-list.component';
import { BlockComponent } from 'src/app/modules/shared/components/block/block.component';

import { CombineLatestComponent } from './combine-latest.component';

fdescribe('CombineLatestComponent', () => {
  let component: CombineLatestComponent;
  let fixture: ComponentFixture<CombineLatestComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CombineLatestComponent,
        BlockListComponent,
        BlockComponent,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CombineLatestComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit three values', fakeAsync(() => {
    fixture.detectChanges();

    const buttons = el.queryAll(By.css('button'));
    expect(buttons?.length).toBe(4);

    buttons[0].triggerEventHandler('click', null);
    buttons[1].triggerEventHandler('click', null);
    buttons[2].triggerEventHandler('click', null);

    tick(7_000);
    fixture.detectChanges();

    expect(component?.results?.length).toBe(3);
    expect(component?.resultsHistory?.length).toBe(1);
    expect(component?.resultsHistory?.[0]?.length).toBe(3);
  }));

  it('should show history', fakeAsync(() => {
    fixture.detectChanges();
    const buttons = el.queryAll(By.css('button'));
    expect(buttons?.length).toBe(4);

    buttons[0].triggerEventHandler('click', null);
    buttons[1].triggerEventHandler('click', null);
    buttons[2].triggerEventHandler('click', null);

    tick(7_000);
    fixture.detectChanges();
    expect(component?.results?.length).toBe(3);

    expect(component?.showHistory).toBe(false);

    buttons[3].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component?.showHistory).toBe(true);
  }));


});
