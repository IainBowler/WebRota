import { Member } from './member';

export class Organisation {
    
  id: number;
  name: string;
  ownerId: string;
  members: Array<Member> = new Array<Member>();

  constructor(name:string = '', ownerId:string = '', members:Array<Member> = [], id:number = 0) {
    this.name = name;
    this.ownerId = ownerId;
    this.members = members;
    this.id = id;
  }

}