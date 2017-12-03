import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../Services/Auth/auth.service';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { Organisation } from '../../Data/organisation';

@Component({
  selector: 'app-create-organisation',
  templateUrl: './create-organisation.component.html',
  styleUrls: ['./create-organisation.component.css']
})

export class CreateOrganisationComponent {

  newOrgName = new FormControl('', Validators.required);

  constructor(private auth: AuthService,
              private orgService: OrganisationsService,
              private router: Router) { }

  create() {
    this.auth.getProfile(() => {
      const org = new Organisation(this.newOrgName.value, this.auth.userProfile.sub);

      this.orgService.create(org).subscribe((returnedOrg) => {
        if (returnedOrg != null) {
          this.router.navigateByUrl('/Organisation/' + returnedOrg.id);
        }
      });
    });
  }
}
