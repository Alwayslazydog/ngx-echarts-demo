import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPieComponent } from './left-pie.component';

describe('LeftPieComponent', () => {
  let component: LeftPieComponent;
  let fixture: ComponentFixture<LeftPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
