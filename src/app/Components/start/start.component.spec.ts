import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { AuthStubService } from '../../Services/Auth/auth.stub.service';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let authStub: any;

  beforeEach(async(() => {

    authStub = new AuthStubService();
    authStub.userProfile = { name: "Bob"};  

    TestBed.configureTestingModule({
      declarations: [ StartComponent ],
      imports: [ FormsModule ],
      providers: [ {provide: AuthService, useValue: authStub }, 
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  it('should welcome the user', () => {
    let el = fixture.debugElement.query(By.css('#start-welcomeMessage')).nativeElement;
    expect(el.textContent).toContain('Welcome ' + authStub.userProfile.name);
  });
});
