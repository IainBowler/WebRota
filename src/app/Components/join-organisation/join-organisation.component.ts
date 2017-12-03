import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AddMember } from '../../Data/Resources/addMember';
import { Organisation } from '../../Data/organisation';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../Services/Auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-organisation',
  templateUrl: './join-organisation.component.html',
  styleUrls: ['./join-organisation.component.css']
})

export class JoinOrganisationComponent implements OnInit {

  userName: string;
  joinOrg  = new FormControl('', Validators.required);

  organisations: Organisation[];

  constructor(private auth: AuthService,
              private orgService: OrganisationsService,
              private router: Router) { }

  ngOnInit() {
    this.auth.getProfile(() => {
      this.userName = this.auth.userProfile.name;
      this.orgService.getAll().subscribe(res => {
        this.organisations = res;
      });
    });
  }

  join() {
    const addMember = new AddMember(this.auth.userProfile.name,
                                    this.auth.userProfile.sub,
                                    this.joinOrg.value.id);

    this.orgService.addMember(addMember).subscribe(() => {
      this.router.navigateByUrl('/MyRota');
    });
  }
}
