import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../Services/Auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css', './home.component.css']
})
export class HomeComponent implements OnInit {

  profile: any;

  constructor (public auth: AuthService, private orgService: OrganisationsService, private router: Router){
  }

  ngOnInit() {
    this.getProfile();
  }

  private async getProfile() {
    if(this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.checkOwnerOrganisations();
    }
    else {
      await this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.checkOwnerOrganisations();
      });
    }
  }

  private checkOwnerOrganisations() {

    this.orgService.getownerOrganisations(this.profile.sub).subscribe((ownerOrgs) => {
      if(ownerOrgs != null && ownerOrgs[0] != null && ownerOrgs[0].length > 0)
        this.router.navigateByUrl('/Organisation');
      if(ownerOrgs != null && ownerOrgs[1] != null && ownerOrgs[1].length > 0)
        this.router.navigateByUrl('/MyRota');
      if(ownerOrgs != null && ownerOrgs[0] != null && ownerOrgs[1] != null && ownerOrgs[0].length === 0 && ownerOrgs[1].length === 0)
        this.router.navigateByUrl('/Start');
    });
  }
}
