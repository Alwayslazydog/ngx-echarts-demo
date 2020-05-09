import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftCurveComponent } from './left-curve.component';

describe('LeftCurveComponent', () => {
  let component: LeftCurveComponent;
  let fixture: ComponentFixture<LeftCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
