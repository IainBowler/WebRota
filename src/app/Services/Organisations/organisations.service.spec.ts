import { Organisation } from '../../Data/organisation';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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

  it('should retrieve data when getOwnerOrganisations is called', inject([OrganisationsService, HttpTestingController], 
                                    (service: OrganisationsService, httpMock: HttpTestingController) => {
    let org = new Organisation();
    let userId = 'userId';
    org.name = 'Test';
    let result: any;
                                      
    service.getOwnerOrganisations(userId).subscribe(res => {
      result = res;
    });
    
    const req = httpMock.expectOne(service.userOrganisationsApiEndPoint + userId);
    req.flush(org);
    expect(result).toEqual(org)
    httpMock.verify();
  }));

  it('should send data when create is called', inject([OrganisationsService, HttpTestingController], 
                    (service: OrganisationsService, httpMock: HttpTestingController) => {
    let org = new Organisation();
    org.name = 'Test';
    org.ownerId = 'userId';
          
    service.create(org).subscribe();

    const req = httpMock.expectOne(service.organisationsApiEndPoint);
    req.flush(org);
    httpMock.verify();
  }));

  it('should retrieve data when get is called', inject([OrganisationsService, HttpTestingController], 
                      (service: OrganisationsService, httpMock: HttpTestingController) => {
    let org = new Organisation();
    let orgId = 1;
    org.name = 'Test';
    let result: any;
          
    service.get(orgId).subscribe(res => {
    result = res;
    });

    const req = httpMock.expectOne(service.organisationsApiEndPoint + orgId.toString());
    req.flush(org);
    expect(result).toEqual(org)
    httpMock.verify();
  }));
});
