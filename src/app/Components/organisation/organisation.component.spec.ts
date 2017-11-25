import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { Organisation } from '../../Data/organisation';
import { ActivatedRouteStub } from '../../Testing/activetedRouterStub';
import { ActivatedRoute, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthStubService } from '../../Services/Auth/auth.stub.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { OrganisationComponent } from './organisation.component';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { OrganisationsStubService } from '../../Services/Organisations/organisationsStub.service';
import { RouterStub } from '../../Testing/routerStub';

describe('OrganisationComponent', () => {
  let component: OrganisationComponent;
  let fixture: ComponentFixture<OrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationComponent ],
      providers: [ {provide: AuthService, useClass: AuthStubService }, 
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: OrganisationsService, useClass: OrganisationsStubService }
      ],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display Organisation Name in the title', () => {
    let orgService = TestBed.get(OrganisationsService);
    let org = new Organisation('Test Org');
    spyOn(orgService, 'get').and.returnValue(Observable.of(org));
    fixture = TestBed.createComponent(OrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('#organisation-title')).nativeElement;

    expect(title.textContent).toContain(org.name);
  });
});
