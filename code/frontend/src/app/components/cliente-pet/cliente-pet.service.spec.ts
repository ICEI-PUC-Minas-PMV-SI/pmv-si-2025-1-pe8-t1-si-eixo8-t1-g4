import { TestBed } from '@angular/core/testing';

import { ClientePetService } from './cliente-pet.service';

describe('ClientePetService', () => {
  let service: ClientePetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientePetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
