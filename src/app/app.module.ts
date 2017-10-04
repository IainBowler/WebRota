import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AuthService } from './Auth/auth.service';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { WelcomeComponent } from './welcome/welcome.component'
import { AuthGuard } from './AuthGuard/authGuard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    WelcomeComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
      { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
      { path: '**', component: WelcomeComponent }
    ]),
    HttpClientModule
  ],
  providers: [ AuthService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
