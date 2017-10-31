import { IOrganisationsService } from './iOrganisations.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrganisationsService implements IOrganisationsService {

  constructor(private http: HttpClient) { }

  getownerOrganisations(userId: string) {
    let url = "http://webrota.iainbowler.com/api/organisations/" + userId;
    return this.http.get(url);
  }
  
}