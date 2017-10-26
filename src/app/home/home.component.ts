import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../Auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css', './home.component.css']
})
export class HomeComponent implements OnInit {

  profile: any;

  constructor (public auth: AuthService, private http: HttpClient, private router: Router){
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
    let url = "http://webrota.iainbowler.com/api/organisations/" + this.profile.sub;
    this.http.get(url).subscribe(res => {
      if(res[0].length > 0)
        this.router.navigateByUrl('/Organisation');
      if(res[1].length > 0)
        this.router.navigateByUrl('/MyRota');
      if(res[0].length === 0 && res[1].length === 0)
        this.router.navigateByUrl('/Start');
      //else
        //console.log('false');
    });
  }
}
