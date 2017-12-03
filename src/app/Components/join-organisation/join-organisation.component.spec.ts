import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinOrganisationPage } from './join-organisation.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrganisationComponent } from './join-organisation.component';
import { OrganisationsStubService } from '../../Services/Organisations/organisationsStub.service';
import { AuthStubService } from '../../Services/Auth/auth.stub.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { Observable } from 'rxjs/Observable';
import { Organisation } from '../../Data/organisation';
import { AddMember } from '../../Data/Resources/addMember';
import { MyRotaComponent } from '../my-rota/my-rota.component';
import { AuthGuard } from '../../Services/AuthGuard/authGuard.service';
import { WelcomeComponent } from '../welcome/welcome.component';
import { RouterStub } from '../../Testing/routerStub';

const appRoutes: Routes = [
  { path: 'MyRota', component: MyRotaComponent },
  { path: '**', component: WelcomeComponent }
];

describe('JoinOrganisationComponent', () => {
  let component: JoinOrganisationComponent;
  let fixture: ComponentFixture<JoinOrganisationComponent>;
  let authServiceStub: any;
  let orgServiceStub: OrganisationsStubService;
  let routerStub: RouterStub;
  let page: JoinOrganisationPage;

  beforeEach(async(() => {
    authServiceStub = new AuthStubService();
    authServiceStub.userProfile = { name: 'Bob', sub: '12'};

    TestBed.configureTestingModule({
      declarations: [ JoinOrganisationComponent,
                      MyRotaComponent,
                      WelcomeComponent],
      imports: [ FormsModule,
                  ReactiveFormsModule ],
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

    fixture = TestBed.createComponent(JoinOrganisationComponent);
    page = new JoinOrganisationPage(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll of the organisations api', async(() => {
    spyOn(orgServiceStub, 'getAll').and.returnValue(Observable.of([]));

    fixture = TestBed.createComponent(JoinOrganisationComponent);
    fixture.detectChanges();

    expect(orgServiceStub.getAll).toHaveBeenCalled();
  }));

  it('should call getProfile of authService', async(() => {
    spyOn(authServiceStub, 'getProfile').and.callThrough();

    fixture = TestBed.createComponent(JoinOrganisationComponent);
    fixture.detectChanges();

    expect(authServiceStub.getProfile).toHaveBeenCalled();
  }));

  it('should populate the organisations array with retrived data from getAll', async(() => {
    spyOn(orgServiceStub, 'getAll').and.returnValue(Observable.of([{'id': 1, 'name': 'New Org', 'ownerId': '1234', 'members': []}]));

    fixture = TestBed.createComponent(JoinOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.organisations.length).toEqual(1);
  }));

  it('should copy the AuthServices profile name', async(() => {
    expect(component.userName).toEqual(authServiceStub.userProfile.name);
  }));

  it('should call join on orgService when an Organisation is selected and the join button clicked', () => {
    const org = new Organisation('New Org', '1234', [], 1);
    const addMember = new AddMember(authServiceStub.userProfile.name, authServiceStub.userProfile.sub, org.id);
    spyOn(orgServiceStub, 'getAll').and.returnValue(Observable.of([org]));
    spyOn(orgServiceStub, 'addMember').and.callThrough();
    fixture = TestBed.createComponent(JoinOrganisationComponent);
    component = fixture.componentInstance;
    page = new JoinOrganisationPage(fixture);
    fixture.detectChanges();
    const orgList = page.organisationsList.nativeElement;

    orgList.value = '0: Object';
    orgList.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    page.joinButton.nativeElement.click();

    expect(orgServiceStub.addMember).toHaveBeenCalledWith(addMember);
  });

  it('should call navigateByUrl on router when an Organisation is selected and the join button clicked', () => {
    const org = new Organisation('New Org', '1234', [], 1);
    const addMember = new AddMember(authServiceStub.userProfile.name, authServiceStub.userProfile.sub, org.id);
    spyOn(orgServiceStub, 'getAll').and.returnValue(Observable.of([org]));
    spyOn(orgServiceStub, 'addMember').and.callThrough();
    spyOn(routerStub, 'navigateByUrl');
    fixture = TestBed.createComponent(JoinOrganisationComponent);
    component = fixture.componentInstance;
    page = new JoinOrganisationPage(fixture);
    fixture.detectChanges();
    const orgList = page.organisationsList.nativeElement;

    orgList.value = '0: Object';
    orgList.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    page.joinButton.nativeElement.click();

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/MyRota');
  });
});
