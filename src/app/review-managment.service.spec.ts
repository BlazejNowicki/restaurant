import { TestBed } from '@angular/core/testing';

import { ReviewManagmentService } from './review-managment.service';

describe('ReviewManagmentService', () => {
  let service: ReviewManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
