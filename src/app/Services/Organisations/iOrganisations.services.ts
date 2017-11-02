import { Observable } from 'rxjs/Rx';
import { Organisation } from '../../Data/organisation';

export interface IOrganisationsService {
    
    getOwnerOrganisations(userId: string);

    create(organisation: Organisation): Observable<Organisation>;

    get(orgId: number): Observable<Organisation>;    
}