import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleChangeWarningComponent } from './role-change-warning.component';

describe('RoleChangeWarningComponent', () => {
  let component: RoleChangeWarningComponent;
  let fixture: ComponentFixture<RoleChangeWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleChangeWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleChangeWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
