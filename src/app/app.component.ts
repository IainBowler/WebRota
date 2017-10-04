import { Component, OnInit } from '@angular/core';

import { AuthService } from './Auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  './app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor (private auth: AuthService){
    auth.handleAuthentication();
  }

  ngOnInit() {
  }

}
