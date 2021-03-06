import { Component, OnInit } from '@angular/core';

import { AuthService } from './Services/Auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor (private auth: AuthService){
    auth.handleAuthentication();
  }

  ngOnInit() {
  }

}
