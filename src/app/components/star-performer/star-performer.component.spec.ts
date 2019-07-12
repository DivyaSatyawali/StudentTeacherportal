import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPerformerComponent } from './star-performer.component';

describe('StarPerformerComponent', () => {
  let component: StarPerformerComponent;
  let fixture: ComponentFixture<StarPerformerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarPerformerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPerformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
