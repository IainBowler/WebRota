import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationComponent } from './create-organisation.component';
import { CreateOrganisationPage } from './create-organisation.page';
import { Organisation } from '../../Data/organisation';
import { OrganisationsStubService } from '../../Services/Organisations/organisationsStub.service';
import { AuthStubService } from '../../Services/Auth/auth.stub.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { AuthGuard } from '../../Services/AuthGuard/authGuard.service';
import { WelcomeComponent } from '../welcome/welcome.component';
import { OrganisationComponent } from '../organisation/organisation.component';
import { RouterStub } from '../../Testing/routerStub';

const appRoutes: Routes = [
  { path: 'Organisation/:id', component: OrganisationComponent },
  { path: '**', component: WelcomeComponent }
];

describe('CreateOrganisationComponent', () => {
  let component: CreateOrganisationComponent;
  let fixture: ComponentFixture<CreateOrganisationComponent>;
  let page: CreateOrganisationPage;
  let authServiceStub: any;
  let orgServiceStub: OrganisationsStubService;
  let routerStub: RouterStub;

  beforeEach(async(() => {
    authServiceStub = new AuthStubService();
    authServiceStub.userProfile = { name: 'Bob', sub: '12'};

    TestBed.configureTestingModule({
      declarations: [ CreateOrganisationComponent,
                      OrganisationComponent,
                      WelcomeComponent ],
      imports: [ FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      providers: [ {provide: AuthService, useValue: authServiceStub },
                    {provide: OrganisationsService, useClass: OrganisationsStubService },
                    {provide: Router, useClass: RouterStub } ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    authServiceStub = TestBed.get(AuthService);
    orgServiceStub = TestBed.get(OrganisationsService);
    routerStub = TestBed.get(Router);

    fixture = TestBed.createComponent(CreateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfile of authService when an Organisation name is typed in and the create button clicked', async(() => {
    const newOrg = new Organisation('New Org', authServiceStub.userProfile.sub);
    spyOn(orgServiceStub, 'create').and.callThrough();
    spyOn(authServiceStub, 'getProfile').and.callThrough();

    fixture = TestBed.createComponent(CreateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new CreateOrganisationPage(fixture);

    const newOrgNameTB: HTMLInputElement = page.newOrganisationNameTextBox.nativeElement;
    newOrgNameTB.value = newOrg.name;
    newOrgNameTB.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    page.createButton.nativeElement.click();

    expect(authServiceStub.getProfile).toHaveBeenCalled();
  }));

  it('should call create on orgService when an Organisation name is typed in and the create button clicked', async(() => {
    const newOrg = new Organisation('New Org', authServiceStub.userProfile.sub);
    spyOn(orgServiceStub, 'create').and.callThrough();

    fixture = TestBed.createComponent(CreateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new CreateOrganisationPage(fixture);

    const newOrgNameTB: HTMLInputElement = page.newOrganisationNameTextBox.nativeElement;
    newOrgNameTB.value = newOrg.name;
    newOrgNameTB.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    page.createButton.nativeElement.click();

    expect(orgServiceStub.create).toHaveBeenCalledWith(newOrg);
  }));

  it('should call navigateByUrl on router when an Organisation is selected and the join button clicked', () => {
    spyOn(orgServiceStub, 'create').and.callThrough();
    spyOn(routerStub, 'navigateByUrl');

    fixture = TestBed.createComponent(CreateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new CreateOrganisationPage(fixture);

    const newOrgNameTB: HTMLInputElement = page.newOrganisationNameTextBox.nativeElement;
    newOrgNameTB.value = 'New Org';
    newOrgNameTB.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    page.createButton.nativeElement.click();

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/Organisation/0');
  });
});
