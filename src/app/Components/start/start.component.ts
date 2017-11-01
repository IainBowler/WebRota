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

  constructor(private auth: AuthService, private orgService: OrganisationsService) { }

  ngOnInit() {
    this.userName = this.auth.userProfile.name;
  }

  create() {
    let org = new Organisation()
    org.name = this.newOrgName;
    org.ownerId = this.auth.userProfile.sub;

    this.orgService.create(org).subscribe();
  }
}
