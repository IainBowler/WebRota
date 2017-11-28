import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationComponent } from './create-organisation.component';
import { CreateOrganisationPage } from './create-organisation.page';
import { Organisation } from '../../Data/organisation';
import { OrganisationsStubService } from '../../Services/Organisations/organisationsStub.service';
import { AuthStubService } from '../../Services/Auth/auth.stub.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { OrganisationsService } from '../../Services/Organisations/organisations.service';

describe('CreateOrganisationComponent', () => {
  let component: CreateOrganisationComponent;
  let fixture: ComponentFixture<CreateOrganisationComponent>;
  let page: CreateOrganisationPage
  let authServiceStub: any;
  let orgServiceStub: OrganisationsStubService;  

  beforeEach(async(() => {
    authServiceStub = new AuthStubService();
    authServiceStub.userProfile = { name: "Bob", sub: "12"};  

    TestBed.configureTestingModule({
      declarations: [ CreateOrganisationComponent ],
      imports: [ FormsModule,
                  ReactiveFormsModule ],
      providers: [ {provide: AuthService, useValue: authServiceStub },
                    {provide: OrganisationsService, useClass: OrganisationsStubService } ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    authServiceStub = TestBed.get(AuthService);
    orgServiceStub = TestBed.get(OrganisationsService);

    fixture = TestBed.createComponent(CreateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call create on orgService when an Organisation name is typed in and the create button clicked', async(() => {
    let newOrg = new Organisation("New Org", authServiceStub.userProfile.sub);
    spyOn(orgServiceStub, 'create').and.callThrough();
    const fixture = TestBed.createComponent(CreateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new CreateOrganisationPage(fixture);

    let newOrgNameTB: HTMLInputElement = page.newOrganisationNameTextBox.nativeElement;
    newOrgNameTB.value = newOrg.name;
    newOrgNameTB.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    page.createButton.nativeElement.click();
    
    expect(orgServiceStub.create).toHaveBeenCalledWith(newOrg);  
  }));  
});
