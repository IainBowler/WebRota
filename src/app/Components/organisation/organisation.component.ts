import { Organisation } from '../../Data/organisation';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {

  organisation: Organisation = new Organisation();

  constructor(private route: ActivatedRoute, private router: Router, private orgService: OrganisationsService) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.orgService.get(+params.get("id"));
      }).subscribe(res => {
        this.organisation = res;
      });
  }
}
