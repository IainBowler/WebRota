import { AuthService } from '../../Services/Auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  userName: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getProfile(() => {
      this.userName = this.auth.userProfile.name;
    });
  }
}
