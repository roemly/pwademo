import { TestBed, inject } from '@angular/core/testing';

import { SubcriptionService } from './subcription.service';

describe('SubcriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubcriptionService]
    });
  });

  it('should be created', inject([SubcriptionService], (service: SubcriptionService) => {
    expect(service).toBeTruthy();
  }));
});
