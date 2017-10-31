import { By } from '@angular/platform-browser';
import * as console from 'console';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { AuthStubService } from '../../Services/Auth/auth.stub.service';
import { WelcomePage } from './welcome.page';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let page: WelcomePage;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    page = new WelcomePage(fixture);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display welcome message', () => {
    expect(page.getWelcomeMessage()).toContain('Welcome to WebRota');
  });

  it('should link to cucumber report', () => {
    expect(page.getCucumberReportLink()).toEqual("http://iainbowler.com/cucumber_reporter.html");
  });
});
