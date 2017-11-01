import { Member } from './member';

export class Organisation {
    
  Id: number;
  name: string;
  ownerId: string;
  Members: Array<Member> = new Array<Member>();

}