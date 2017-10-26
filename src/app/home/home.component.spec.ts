import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from './home.component';
import { AuthService } from '../Auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AuthStubService } from '../Auth/auth.stub.service';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

class DataHelper {

  private component: HomeComponent;
  private orgGetReaquestRecieved: boolean = false;
  
  constructor(private httpMock: HttpTestingController,
              private authServiceStub) {
  
  }

  setComponent(component: HomeComponent) {
    this.component = component;
  }

  getOrgGetReaquestRecieved(): boolean {
    return this.orgGetReaquestRecieved;
  }

  flushData(data: any) {
    try {
      let url = "http://webrota.iainbowler.com/api/organisations/" + this.authServiceStub.userProfile.sub;
      const req = this.httpMock.expectOne(url);
      req.flush(data);
      this.orgGetReaquestRecieved = true;
    }
    catch (error) {
      this.orgGetReaquestRecieved = false;
    }
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceStub: any;
  let authSpy: any;
  let dataHelper: DataHelper;


  beforeEach(async(() => {

    authServiceStub = new AuthStubService();
    authServiceStub.userProfile = { sub: "userId"};  
     
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [ {provide: AuthService, useValue: authServiceStub }, 
        { provide: Router, useClass: RouterStub }
       ],      
    })
    .compileComponents();
  }));

  beforeEach(inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    
    authServiceStub = TestBed.get(AuthService);
    

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    dataHelper = new DataHelper(httpMock, authServiceStub);

    fixture.detectChanges();
  }));

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
    const localFixture = TestBed.createComponent(HomeComponent);
    dataHelper.setComponent(localFixture.componentInstance);

    dataHelper.flushData([[], []]);

    expect(dataHelper.getOrgGetReaquestRecieved()).toBeTruthy();
  }));

  it('should call navigate to /Organisations when api returns an organisation user owns', async(() => {
    const localFixture = TestBed.createComponent(HomeComponent);
    dataHelper.setComponent(localFixture.componentInstance);
    let routerStub = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigateByUrl');        
    dataHelper.flushData([[{"id":1,"name":"New Org","ownerId":"userId","members":[]}], []]);

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/Organisation');
  }));

  it('should call navigate to /Organisations when api returns an organisation user owns and an organisation user is a member of', async(() => {
    const localFixture = TestBed.createComponent(HomeComponent);
    dataHelper.setComponent(localFixture.componentInstance);
    let routerStub = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigateByUrl');        
    dataHelper.flushData([[{"id":1,"name":"New Org","ownerId":"userId","members":[]}], [{"id":2,"name":"Org 12","ownerId":"12","members":[{"id":1,"name":"Iain","userId":"userId"}]}]]);

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/Organisation');
  }));

  it('should call navigate to /MyRota when api returns an organisation user is a member of', async(() => {
    const localFixture = TestBed.createComponent(HomeComponent);
    dataHelper.setComponent(localFixture.componentInstance);
    let routerStub = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigateByUrl');        
    dataHelper.flushData([[], [{"id":2,"name":"Org 12","ownerId":"12","members":[{"id":1,"name":"Iain","userId":"userId"}]}]]);

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/MyRota');
  }));

  it('should call navigate to /Start when api returns no organisations', async(() => {
    const localFixture = TestBed.createComponent(HomeComponent);
    dataHelper.setComponent(localFixture.componentInstance);
    let routerStub = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigateByUrl');        
    dataHelper.flushData([[], []]);

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/Start');
  }));
});
