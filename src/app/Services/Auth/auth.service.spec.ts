import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { Auth0Stub } from './auth0.stub';

class RouterStub {
  navigate(commands: any[]) { }
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthService, 
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: Router, useClass: RouterStub }
       ],      
    });
  });

  afterEach(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  })

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should set auth info if auth0.parseHash returns correct authResult in handleAuthentication', inject([AuthService], (service: AuthService) => {
    
    service.auth0 = new Auth0Stub();
    service.auth0.setGoodParseHashInfo();

    service.handleAuthentication();

    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));    

    expect(localStorage.getItem('access_token')).toEqual(service.auth0.parseHashObj.authResult.accessToken);
    expect(localStorage.getItem('id_token')).toEqual(service.auth0.parseHashObj.authResult.idToken);
    expect(new Date().getTime() < expiresAt).toEqual(true);
  }));

  it('should reset window.location.hash if auth0.parseHash returns correct authResult in handleAuthentication', inject([AuthService], (service: AuthService) => {
    
    window.location.hash = 'test';
    service.auth0 = new Auth0Stub();
    service.auth0.setGoodParseHashInfo();

    service.handleAuthentication();

    expect(window.location.hash).toEqual('');
  }));

  it('should nagivate to home route if auth0.parseHash returns correct authResult in handleAuthentication', inject([AuthService], (service: AuthService) => {
    
    let routerStub = TestBed.get(Router);
    spyOn(routerStub, 'navigate');
    service.auth0 = new Auth0Stub();
    service.auth0.setGoodParseHashInfo();
    
    service.handleAuthentication();
    
    expect(routerStub.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should nagivate to home route if auth0.parseHash returns an error and does not return correct authResult in handleAuthentication', inject([AuthService], (service: AuthService) => {
    
    let routerStub = TestBed.get(Router);
    spyOn(console, 'log');
    spyOn(routerStub, 'navigate');
    service.auth0 = new Auth0Stub();
    service.auth0.parseHashObj.err = 'error';

    service.handleAuthentication();
    
    expect(routerStub.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should call console.log with error obj if auth0.parseHash returns an error and does not return correct authResult in handleAuthentication', inject([AuthService], (service: AuthService) => {
    
    spyOn(console, 'log');
    service.auth0 = new Auth0Stub();
    const error = { errorMsg: 'error'};
    service.auth0.parseHashObj.err = error;

    service.handleAuthentication();
    
    expect(console.log).toHaveBeenCalledWith(error);
  }));

  it('should call console.log with error obj if auth0.parseHash returns an error and does not return access token in handleAuthentication', inject([AuthService], (service: AuthService) => {
    
    spyOn(console, 'log');
    service.auth0 = new Auth0Stub();
    service.auth0.setGoodParseHashInfo();
    const error = { errorMsg: 'error'};
    service.auth0.parseHashObj.err = error;
    service.auth0.parseHashObj.authResult.accessToken = null;

    service.handleAuthentication();
    
    expect(console.log).toHaveBeenCalledWith(error);
  }));

  it('should call console.log with error obj if auth0.parseHash returns an error and does not return id token in handleAuthentication', inject([AuthService], (service: AuthService) => {
    
    spyOn(console, 'log');
    service.auth0 = new Auth0Stub();
    service.auth0.setGoodParseHashInfo();
    const error = { errorMsg: 'error'};
    service.auth0.parseHashObj.err = error;
    service.auth0.parseHashObj.authResult.idToken = null;

    service.handleAuthentication();
    
    expect(console.log).toHaveBeenCalledWith(error);
  }));

  it('should call console.log with error obj if auth0.parseHash returns an error and does not return expiresIn in handleAuthentication', inject([AuthService], (service: AuthService) => {
    
    spyOn(console, 'log');
    service.auth0 = new Auth0Stub();
    service.auth0.setGoodParseHashInfo();
    const error = { errorMsg: 'error'};
    service.auth0.parseHashObj.err = error;
    service.auth0.parseHashObj.authResult.expiresIn = null;

    service.handleAuthentication();
    
    expect(console.log).toHaveBeenCalledWith(error);
  }));

  it('should call auth0 authorize method from login', inject([AuthService], (service: AuthService) => {
    service.auth0 = new Auth0Stub();
    let auth0Spy = spyOn(service.auth0, 'authorize');

    service.login();

    expect(service.auth0.authorize).toHaveBeenCalled();
  }));

  it('should clear local storage from logout', inject([AuthService], (service: AuthService) => {
    localStorage.setItem('access_token', 'one');
    localStorage.setItem('id_token', 'two');
    localStorage.setItem('expires_at', 'three');

    service.logout();

    expect(localStorage.getItem('access_token')).toBeFalsy();
    expect(localStorage.getItem('id_token')).toBeFalsy();
    expect(localStorage.getItem('expires_at')).toBeFalsy();
  }));

  it('should nagivate to home route from logout', inject([AuthService], (service: AuthService) => {
    
    let routerStub = TestBed.get(Router);
    spyOn(routerStub, 'navigate');
    
    service.logout();

    expect(routerStub.navigate).toHaveBeenCalledWith(['/']);
  }));
    
  it('should return true from isAuthenticated when users authentication has not expired', inject([AuthService], (service: AuthService) => {

    const expiresAt = JSON.stringify(new Date().getTime() + (3600 * 1000));
    
    localStorage.setItem('expires_at', expiresAt);
    
    let result = service.isAuthenticated();

    expect(result).toEqual(true);
  }));      

  it('should return false from isAuthenticated when users authentication has expired', inject([AuthService], (service: AuthService) => {
    
    const expiresAt = JSON.stringify(new Date().getTime() - (3600 * 1000));
    
    localStorage.setItem('expires_at', expiresAt);
    
    let result = service.isAuthenticated();

    expect(result).toEqual(false);
  }));

  it('should return false from isAuthenticated when users authentication has not been set', inject([AuthService], (service: AuthService) => {
    
    let result = service.isAuthenticated();

    expect(result).toEqual(false);
  }));

  it('should throw an exception if access token is not set from getProfile', inject([AuthService], (service: AuthService) => {
    
    expect(service.getProfile.bind(this, () => {})).toThrow();
  }));  

  it('should call auth0.client.userInfo with the access token from getProfile', inject([AuthService], (service: AuthService) => {
    
    localStorage.setItem('access_token', 'token');
    service.auth0 = new Auth0Stub();
    spyOn(service.auth0.client, 'userInfo');

    service.getProfile(() => {});

    expect(service.auth0.client.userInfo).toHaveBeenCalled();
  }));  

  it('should set profile to profile sent from auth0.client.userInfo', inject([AuthService], (service: AuthService) => {
    
    localStorage.setItem('access_token', 'token');
    service.auth0 = new Auth0Stub();
    let profile = { name: 'Test User'}
    service.auth0.client.setuserInfoInfo('error', profile);
    
    service.getProfile(() => {});

    expect(service.userProfile).toEqual(profile);
  }));

  it('should return the profile and any error to the callback function', inject([AuthService], (service: AuthService) => {
    
    localStorage.setItem('access_token', 'token');
    service.auth0 = new Auth0Stub();
    let profile = { name: 'Test User'}
    let error = 'error';
    service.auth0.client.setuserInfoInfo(error, profile);
    let returnedError;
    let returnedProfile;
    
    service.getProfile((passedError, passedProfile) => {
      returnedError = passedError;
      returnedProfile = passedProfile;
    });

    expect(returnedError).toEqual(error);
    expect(returnedProfile).toEqual(profile);
  }));
  
});
