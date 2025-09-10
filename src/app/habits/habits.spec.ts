import { TestBed } from '@angular/core/testing';

import { Habits } from './habitsService';

describe('Habits', () => {
  let service: Habits;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Habits);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
