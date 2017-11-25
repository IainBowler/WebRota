import { AddMember } from '../../Data/Resources/addMember';
import { Organisation } from '../../Data/organisation';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../Services/Auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css', './start.component.css']
})

export class StartComponent implements OnInit {

  userName: string;
  newOrgName: string;
  joinOrg: Organisation;

  organisations: Organisation[];

  constructor(private auth: AuthService, private orgService: OrganisationsService) { }

  ngOnInit() {
    this.userName = this.auth.userProfile.name;
    this.orgService.getAll().subscribe(res => {
      this.organisations = res;
    })
  }

  create() {
    let org = new Organisation(this.newOrgName, this.auth.userProfile.sub)

    this.orgService.create(org).subscribe();
  }

  join() {
    let addMember = new AddMember();
    addMember.name = this.auth.userProfile.name;
    addMember.userId = this.auth.userProfile.sub;
    addMember.organisationId = this.joinOrg.id;

    this.orgService.addMember(addMember).subscribe();
  }
}