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

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.userName = this.auth.userProfile.name;
  }

  test() {
    let testObs = Observable.of([[{name: 'test'}], []]);
    testObs.subscribe(res => {
      console.log(res);
    });
    console.log('test');
  }
}
