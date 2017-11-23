import { DebugElement } from '@angular/core';
import { document } from 'ngx-bootstrap/utils/facade/browser';
import { Organisation } from '../../Data/organisation';
import { AddMember } from '../../Data/Resources/addMember';
import { StartPage } from './start.page';
import { Observable } from 'rxjs/Rx';
import { OrganisationsStubService } from '../../Services/Organisations/organisationsStub.service';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { AuthStubService } from '../../Services/Auth/auth.stub.service';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StartComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let authServiceStub: any;
  let orgServiceStub: OrganisationsStubService;
  let page: StartPage;

  beforeEach(async(() => {

    authServiceStub = new AuthStubService();
    authServiceStub.userProfile = { name: "Bob", sub: "12"};  

    TestBed.configureTestingModule({
      declarations: [ StartComponent ],
      imports: [ FormsModule ],
      providers: [ {provide: AuthService, useValue: authServiceStub },
                    {provide: OrganisationsService, useClass: OrganisationsStubService }
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authServiceStub = TestBed.get(AuthService);
    orgServiceStub = TestBed.get(OrganisationsService);

    fixture = TestBed.createComponent(StartComponent);
    page = new StartPage(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  it('should welcome the user', () => {
    let el = fixture.debugElement.query(By.css('#start-welcomeMessage')).nativeElement;
    expect(el.textContent).toContain('Welcome ' + authServiceStub.userProfile.name);
  });

  it('should call getAll of the organisations api', async(() => {
    spyOn(orgServiceStub, 'getAll').and.returnValue(Observable.of([]));

    const fixture = TestBed.createComponent(StartComponent);
    fixture.detectChanges();

    expect(orgServiceStub.getAll).toHaveBeenCalled();
  }));

  it('should populate the organisations array with retrived data from getAll', async(() => {
    spyOn(orgServiceStub, 'getAll').and.returnValue(Observable.of([{"id": 1, "name": "New Org", "ownerId": "1234", "members": []}]));
    
    const fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.organisations.length).toEqual(1);
  }));

  it('should copy the AuthServices profile name', async(() => {
    expect(component.userName).toEqual(authServiceStub.userProfile.name);
  }));

  it('should call create on orgService when an Organisation name is typed in and the create button clicked', fakeAsync(() => {
    let newOrg = new Organisation();
    newOrg.name = "New Org";
    newOrg.ownerId = authServiceStub.userProfile.sub;
    spyOn(orgServiceStub, 'create').and.callThrough();
    const fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new StartPage(fixture);

    let newOrgNameTB: HTMLInputElement = page.getNewOrganisationNameTextBox().nativeElement;
    newOrgNameTB.value = newOrg.name;
    newOrgNameTB.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    page.getCreateButton().nativeElement.click();
    
    expect(orgServiceStub.create).toHaveBeenCalledWith(newOrg);  
  }));  

  it('should call join on orgService when an Organisation is selected and the join button clicked', () => {
    let org = new Organisation();
    org.id = 1;
    org.name = "New Org";
    org.ownerId = "1234";
    let addMember = new AddMember();
    addMember.name = authServiceStub.userProfile.name;
    addMember.userId = authServiceStub.userProfile.sub;
    addMember.organisationId = org.id;
    spyOn(orgServiceStub, 'getAll').and.returnValue(Observable.of([org]));
    spyOn(orgServiceStub, 'addMember').and.callThrough();
    const fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    page = new StartPage(fixture);
    fixture.detectChanges();
    let orgList = page.getOrganisationsList().nativeElement;

    orgList.value = "0: Object";
    orgList.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    page.getJoinButton().nativeElement.click();
    
    expect(orgServiceStub.addMember).toHaveBeenCalledWith(addMember);      
  });  
});
