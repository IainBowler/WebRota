import { Observable } from 'rxjs/Rx';
import { Organisation } from '../../Data/organisation';
import { IOrganisationsService } from './iOrganisations.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrganisationsService {

  private _apiEndPoint: string = "http://webrota.iainbowler.com/api/organisations/"
  get apiEndPoint(): string { return this._apiEndPoint; }

  constructor(private http: HttpClient) { }

  getOwnerOrganisations(userId: string) {
    let url = this._apiEndPoint + userId;
    return this.http.get(url);
  }

  create(organisation: Organisation): Observable<Object> {
    let url = this._apiEndPoint;
    return this.http.post(url, organisation);
  }
}