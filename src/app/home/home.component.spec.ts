import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from './home.component';
import { AuthService } from '../Auth/auth.service';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AuthStubService } from '../Auth/auth.stub.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceStub: any;

  let authSpy: any;

  beforeEach(async(() => {

    authServiceStub = new AuthStubService();
    authServiceStub.userProfile = { name: "Test User"};  
     
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        RouterModule.forRoot([
          { path: '', component: HomeComponent },
          { path: 'home', component: HomeComponent },
          { path: '**', component: HomeComponent }
        ]),
      ],
      providers: [ {provide: AuthService, useValue: authServiceStub }, { provide: APP_BASE_HREF, useValue : '/' } ],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authServiceStub = fixture.debugElement.injector.get(AuthService);    
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain('Welcome ' + authServiceStub.userProfile.name);
  }));

  it('should copy the AuthServices profile if the AuthService profile is not null', async(() => {
  
    expect(component.profile).toEqual(authServiceStub.userProfile);
  }));

  it('should call getProfile on AuthService if userProfile of AuthService is null', async(() => {
    let authService = TestBed.get(AuthService);
    authService.userProfile = null;
    authSpy = spyOn(authService, 'getProfile');    
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    expect(authService.getProfile).toHaveBeenCalled();
  }));

});
