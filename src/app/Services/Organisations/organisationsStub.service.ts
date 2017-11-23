import { Organisation } from '../../Data/organisation';
import { Observable } from 'rxjs/Rx';
import { IOrganisationsService } from './iOrganisations.services';
import { Injectable } from "@angular/core";
import { AddMember } from '../../Data/Resources/addMember';
import { Member } from '../../Data/member';

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

    public getAll(): Observable<Organisation[]> {
        return Observable.of([new Organisation(), new Organisation()]);
    }

    public addMember(AddMember): Observable<Member> {
        return Observable.of(new Member());
    }
}