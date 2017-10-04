import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './authGuard.service';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { AuthStubService } from '../Auth/auth.stub.service';

class RouterStub {
  navigate(commands: any[]) { }
}

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthGuard, 
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthStubService }
       ],      
    });
  });

  it('should be created', inject([AuthGuard], (service: AuthGuard) => {
    expect(service).toBeTruthy();
  }));

  it('should return true from canActivate is user is authorised', inject([AuthGuard], (service: AuthGuard) => {
    
    let authServiceStub = TestBed.get(AuthService);
    spyOn(authServiceStub, 'isAuthenticated').and.returnValue(true);

    let result = service.canActivate();

    expect(result).toEqual(true);
  }));

  it('should return false from canActivate is user is not authorised', inject([AuthGuard], (service: AuthGuard) => {
    
    let authServiceStub = TestBed.get(AuthService);
    spyOn(authServiceStub, 'isAuthenticated').and.returnValue(false);

    let result = service.canActivate();

    expect(result).toEqual(false);
  }));

  it('should navigate to welcome page from canActivate is user is not authorised', inject([AuthGuard], (service: AuthGuard) => {
    
    let authServiceStub = TestBed.get(AuthService);
    spyOn(authServiceStub, 'isAuthenticated').and.returnValue(false);
    let routerStub = TestBed.get(Router);
    spyOn(routerStub, 'navigate');

    let result = service.canActivate();

    expect(routerStub.navigate).toHaveBeenCalledWith(['/Welcome']);
  }));

});
