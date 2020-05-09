import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidMapComponent } from './mid-map.component';

describe('MidMapComponent', () => {
  let component: MidMapComponent;
  let fixture: ComponentFixture<MidMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
