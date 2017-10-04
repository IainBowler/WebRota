import { Component, OnInit } from '@angular/core';
import { AuthService } from "../Auth/auth.service";
import { User } from "../Data/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css', './home.component.css']
})
export class HomeComponent implements OnInit {

  profile: any;

  users: User[] = [];

  constructor (private auth: AuthService){
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }
}
