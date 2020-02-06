import { TestBed } from '@angular/core/testing';

import { RecordingServiceService } from './recording-service.service';

describe('RecordingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordingServiceService = TestBed.get(RecordingServiceService);
    expect(service).toBeTruthy();
  });
});
