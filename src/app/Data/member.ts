export class Member {
    
  id: number;
  name: string;
  userId: string;

  constructor(name:string = '', userId:string = '', id:number = 0) {
    this.name = name;
    this.userId = userId;
    this.id = id;
  }
}