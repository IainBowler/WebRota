import { Member } from './member';

export class Organisation {
    
  id: number;
  name: string;
  ownerId: string;
  members: Array<Member> = new Array<Member>();

}