import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEnrollmentsComponent } from './all-enrollments.component';

describe('AllEnrollmentsComponent', () => {
  let component: AllEnrollmentsComponent;
  let fixture: ComponentFixture<AllEnrollmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEnrollmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
