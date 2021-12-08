import { TestBed } from '@angular/core/testing';

import { DishManagmentService } from './dish-managment.service';

describe('DishManagmentService', () => {
  let service: DishManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
