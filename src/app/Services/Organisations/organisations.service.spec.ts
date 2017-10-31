import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { OrganisationsService } from './organisations.service';

describe('OrganisationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],

      providers: [OrganisationsService]
    });
  });

  it('should be created', inject([OrganisationsService], (service: OrganisationsService) => {
    expect(service).toBeTruthy();
  }));
});
