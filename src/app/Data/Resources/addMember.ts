export class AddMember {
    name: string;
    userId: string;
    organisationId: number;

    constructor(name:string, userId:string, organisationId:number) {
        this.name = name;
        this.userId = userId;
        this.organisationId = organisationId;
      }
}