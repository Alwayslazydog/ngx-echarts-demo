import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightLocalComponent } from './right-local.component';

describe('RightLocalComponent', () => {
  let component: RightLocalComponent;
  let fixture: ComponentFixture<RightLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
