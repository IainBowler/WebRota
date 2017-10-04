import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { AuthStubService } from '../Auth/auth.stub.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [
        RouterModule.forRoot([
        ]),
      ],
      providers: [ {provide: AuthService, useClass: AuthStubService }, { provide: APP_BASE_HREF, useValue : '/' } ],      
    })
    .compileComponents();
  }));

  it('should be created', () => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
