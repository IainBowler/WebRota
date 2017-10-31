import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../Services/Auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  './nav.component.css']
})
export class NavComponent implements OnInit {

  constructor (private auth: AuthService, private router: Router){
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('\Welcome');
  }

}
