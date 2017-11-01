import { Observable } from 'rxjs/Rx';
import { OrganisationsStubService } from '../../Services/Organisations/organisationsStub.service';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from './home.component';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AuthStubService } from '../../Services/Auth/auth.stub.service';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceStub: any;
  let orgServiceStub: any;
  let routerStub: any;
  let authSpy: any;

  beforeEach(async(() => {

    authServiceStub = new AuthStubService();
    authServiceStub.userProfile = { sub: "userId"};  
     
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ {provide: AuthService, useValue: authServiceStub }, 
        { provide: Router, useClass: RouterStub },
        { provide: OrganisationsService, useClass: OrganisationsStubService }
      ],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    authServiceStub = TestBed.get(AuthService);
    orgServiceStub = TestBed.get(OrganisationsService);
    routerStub = TestBed.get(Router);
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading message in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain('Loading... please wait');
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

  it('should call organisations api', async(() => {
    spyOn(orgServiceStub, 'getOwnerOrganisations').and.returnValue(Observable.of([[], []]));

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    expect(orgServiceStub.getOwnerOrganisations).toHaveBeenCalled();
  }));

  it('should call navigate to /Organisations when api returns an organisation user owns', async(() => {
    spyOn(orgServiceStub, 'getOwnerOrganisations').and.returnValue(Observable.of([[{"id":1,"name":"New Org","ownerId":"userId","members":[]}], []]));
    spyOn(routerStub, 'navigateByUrl');        
    
    const localFixture = TestBed.createComponent(HomeComponent);
    localFixture.detectChanges();

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/Organisation');
  }));

  it('should call navigate to /Organisations when api returns an organisation user owns and an organisation user is a member of', async(() => {
    spyOn(orgServiceStub, 'getOwnerOrganisations').and.returnValue(Observable.of([[{"id":1,"name":"New Org","ownerId":"userId","members":[]}], [{"id":2,"name":"Org 12","ownerId":"12","members":[{"id":1,"name":"Iain","userId":"userId"}]}]]));
    spyOn(routerStub, 'navigateByUrl');        
    
    const localFixture = TestBed.createComponent(HomeComponent);
    localFixture.detectChanges();
    
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/Organisation');
  }));

  it('should call navigate to /MyRota when api returns an organisation user is a member of', async(() => {
    spyOn(orgServiceStub, 'getOwnerOrganisations').and.returnValue(Observable.of([[], [{"id":2,"name":"Org 12","ownerId":"12","members":[{"id":1,"name":"Iain","userId":"userId"}]}]]));
    spyOn(routerStub, 'navigateByUrl');        
    
    const localFixture = TestBed.createComponent(HomeComponent);
    localFixture.detectChanges();
    
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/MyRota');
  }));

  it('should call navigate to /Start when api returns no organisations', async(() => {
    spyOn(orgServiceStub, 'getOwnerOrganisations').and.returnValue(Observable.of([[], []]));
    spyOn(routerStub, 'navigateByUrl');        
    
    const localFixture = TestBed.createComponent(HomeComponent);
    localFixture.detectChanges();
    
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/Start');
  }));
});
