import { WelcomeComponent } from '../welcome/welcome.component';
import { AuthGuard } from '../AuthGuard/authGuard.service';
import { HomeComponent } from '../home/home.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';

import { NavComponent } from './nav.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { AuthStubService } from '../Auth/auth.stub.service';
import { NavPage } from './nav.page';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let page: NavPage;
  let authServiceStub: any;
  let routerStub: any;
 
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [  {provide: AuthService, useClass: AuthStubService }, 
                    { provide: Router, useClass: RouterStub } ],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    page = new NavPage(fixture);
    authServiceStub = fixture.debugElement.injector.get(AuthService);
    routerStub = fixture.debugElement.injector.get(Router);
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

  it('should navigate to the Welcome page when the Logout button is clicked', () => {
    authServiceStub.authenticated = true;
    spyOn(routerStub, 'navigateByUrl');
    fixture.detectChanges();

    page.getLogoutButton().nativeElement.click();

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('\Welcome');
  });  
});