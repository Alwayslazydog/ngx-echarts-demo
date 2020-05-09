import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightUserComponent } from './right-user.component';

describe('RightUserComponent', () => {
  let component: RightUserComponent;
  let fixture: ComponentFixture<RightUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
