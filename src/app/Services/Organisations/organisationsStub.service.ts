import { Organisation } from '../../Data/organisation';
import { Observable } from 'rxjs/Rx';
import { IOrganisationsService } from './iOrganisations.services';
import { Injectable } from "@angular/core";

@Injectable()
export class OrganisationsStubService implements IOrganisationsService {

    public getOwnerOrganisations(userId: string): Observable<Object> {
        return Observable.of([[], []]);
    }

    public create(organisation: Organisation): Observable<Organisation> {
        return Observable.of(new Organisation());
    }

    public get(orgId: number): Observable<Organisation> {
        return Observable.of(new Organisation());
    }
}