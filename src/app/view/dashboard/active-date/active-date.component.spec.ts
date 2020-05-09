import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDateComponent } from './active-date.component';

describe('ActiveDateComponent', () => {
  let component: ActiveDateComponent;
  let fixture: ComponentFixture<ActiveDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
