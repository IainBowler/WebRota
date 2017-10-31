import { Observable } from 'rxjs/Rx';
import { IOrganisationsService } from './iOrganisations.services';
import { Injectable } from "@angular/core";

@Injectable()
export class OrganisationsStubService implements IOrganisationsService {

    public getownerOrganisations(userId: string) {
        return Observable.from([[1, 2], []]);
    }
}