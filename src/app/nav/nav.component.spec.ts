import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';

import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { AuthStubService } from '../Auth/auth.stub.service';
import { NavPage } from './nav.page';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let page: NavPage;
  let authServiceStub: any;
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [
        RouterModule.forRoot([
        ]),
      ],
      providers: [ {provide: AuthService, useClass: AuthStubService }, { provide: APP_BASE_HREF, useValue : '/' } ],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    page = new NavPage(fixture);
    authServiceStub = fixture.debugElement.injector.get(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the logout button when user is authenticated', () => {
    authServiceStub.authenticated = true;
    fixture.detectChanges();
 
    expect(page.getLogoutButton()).toBeTruthy();
  });  

  it('should hide the logout button when user is not authenticated', () => {
    authServiceStub.authenticated = false;
    fixture.detectChanges();

    expect(page.getLogoutButton()).toBeFalsy();
  });  

  it('should show the login button when user is not authenticated', () => {
    authServiceStub.authenticated = false;
    fixture.detectChanges();
 
    expect(page.getLoginButton()).toBeTruthy();
  });  

  it('should hide the login button when user is authenticated', () => {
    authServiceStub.authenticated = true;
    fixture.detectChanges();

    expect(page.getLoginButton()).toBeFalsy();
  });  

  it('should call login on the AuthService when the Login button is clicked', () => {
    authServiceStub.authenticated = false;
    spyOn(authServiceStub, 'login');
    fixture.detectChanges();

    page.getLoginButton().nativeElement.click();

    expect(authServiceStub.login).toHaveBeenCalled();
  });  

  it('should call logout on the AuthService when the Logout button is clicked', () => {
    authServiceStub.authenticated = true;
    spyOn(authServiceStub, 'logout');
    fixture.detectChanges();

    page.getLogoutButton().nativeElement.click();

    expect(authServiceStub.logout).toHaveBeenCalled();
  });  
});