import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '../../Services/Auth/auth.service';
import { AuthStubService } from '../../Services/Auth/auth.stub.service';
import { CreateOrganisationComponent } from '../create-organisation/create-organisation.component';
import { JoinOrganisationComponent } from '../join-organisation/join-organisation.component';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { OrganisationsStubService } from '../../Services/Organisations/organisationsStub.service';
import { RouterStub } from '../../Testing/routerStub';
import { StartComponent } from './start.component';
import { StartPage } from './start.page';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let authServiceStub: any;
  let page: StartPage;

  beforeEach(async(() => {

    authServiceStub = new AuthStubService();
    authServiceStub.userProfile = { name: 'Bob', sub: '12'};

    TestBed.configureTestingModule({
      declarations: [ StartComponent,
                      CreateOrganisationComponent,
                      JoinOrganisationComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [ {provide: AuthService, useValue: authServiceStub },
                    {provide: OrganisationsService, useClass: OrganisationsStubService },
                    {provide: Router, useClass: RouterStub } ],
})
    .compileComponents();
  }));

  beforeEach(() => {
    authServiceStub = TestBed.get(AuthService);

    fixture = TestBed.createComponent(StartComponent);
    page = new StartPage(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should copy the AuthServices profile name', async(() => {
    expect(component.userName).toEqual(authServiceStub.userProfile.name);
  }));

  it('should call getProfile of authService', async(() => {
    spyOn(authServiceStub, 'getProfile').and.callThrough();

    fixture = TestBed.createComponent(StartComponent);
    fixture.detectChanges();

    expect(authServiceStub.getProfile).toHaveBeenCalled();
  }));

  it('should welcome the user', () => {
    const el = page.welcomeMessage.nativeElement;
    expect(el.textContent).toContain('Welcome ' + authServiceStub.userProfile.name);
  });
});
