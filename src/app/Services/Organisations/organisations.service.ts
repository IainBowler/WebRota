import { Observable } from 'rxjs/Rx';
import { Organisation } from '../../Data/organisation';
import { IOrganisationsService } from './iOrganisations.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrganisationsService {

  private _organisationsApiEndPoint: string = "http://webrota.iainbowler.com/api/organisations/"
  get organisationsApiEndPoint(): string { return this._organisationsApiEndPoint; }
  private _userOrganisationsApiEndPoint: string = "http://webrota.iainbowler.com/api/userorganisations/"
  get userOrganisationsApiEndPoint(): string { return this._userOrganisationsApiEndPoint; }

  constructor(private http: HttpClient) { }

  getOwnerOrganisations(userId: string) {
    let url = this._userOrganisationsApiEndPoint + userId;
    return this.http.get(url);
  }

  create(organisation: Organisation): Observable<Object> {
    let url = this._organisationsApiEndPoint;
    return this.http.post(url, organisation);
  }
}