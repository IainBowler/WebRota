import { Observable } from 'rxjs/Rx';
import { Organisation } from '../../Data/organisation';
import { IOrganisationsService } from './iOrganisations.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrganisationsService implements IOrganisationsService {

  private _organisationsApiEndPoint: string = "http://webrota.iainbowler.com/api/organisations/";
  get organisationsApiEndPoint(): string { return this._organisationsApiEndPoint; };
  private _userOrganisationsApiEndPoint: string = "http://webrota.iainbowler.com/api/userorganisations/";
  get userOrganisationsApiEndPoint(): string { return this._userOrganisationsApiEndPoint; };

  constructor(private http: HttpClient) { }

  getOwnerOrganisations(userId: string): Observable<Object> {
    let url = this._userOrganisationsApiEndPoint + userId;
    return this.http.get(url);
  }

  create(organisation: Organisation): Observable<Organisation> {
    let url = this._organisationsApiEndPoint;
    return this.http.post<Organisation>(url, organisation);
  }

  get(orgId: number): Observable<Organisation> {
    let url = this._organisationsApiEndPoint + orgId.toString();
    return this.http.get<Organisation>(url);
  }  

  getAll(): Observable<Organisation> {
    return this.http.get<Organisation>(this._organisationsApiEndPoint);
  }
}