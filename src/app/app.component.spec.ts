import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { NavComponent } from './Components/nav/nav.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './Services/Auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        WelcomeComponent
      ],
      imports: [
        RouterModule.forRoot([
        ]),
      ],
      providers: [ AuthService, { provide: APP_BASE_HREF, useValue : '/' } ],      
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
