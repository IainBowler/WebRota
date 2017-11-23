import { Member } from '../../Data/member';
import { AddMember } from '../../Data/Resources/addMember';
import { Observable } from 'rxjs/Rx';
import { Organisation } from '../../Data/organisation';

export interface IOrganisationsService {
    
    getOwnerOrganisations(userId: string);

    create(organisation: Organisation): Observable<Organisation>;

    get(orgId: number): Observable<Organisation>;    

    getAll(): Observable<Organisation[]>;

    addMember(addMember: AddMember): Observable<Member>;
    
}