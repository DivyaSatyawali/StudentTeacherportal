import { TestBed } from '@angular/core/testing';

import { StarPerformerService } from './star-performer.service';

describe('StarPerformerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarPerformerService = TestBed.get(StarPerformerService);
    expect(service).toBeTruthy();
  });
});
