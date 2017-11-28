import { OrganisationsService } from './Services/Organisations/organisations.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AuthService } from './Services/Auth/auth.service';
import { HomeComponent } from './Components/home/home.component';
import { NavComponent } from './Components/nav/nav.component';
import { WelcomeComponent } from './Components/welcome/welcome.component'
import { AuthGuard } from './Services/AuthGuard/authGuard.service';
import { StartComponent } from './Components/start/start.component';
import { OrganisationComponent } from './Components/organisation/organisation.component';
import { MyRotaComponent } from './Components/my-rota/my-rota.component';
import { CreateOrganisationComponent } from './Components/create-organisation/create-organisation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    WelcomeComponent,
    StartComponent,
    OrganisationComponent,
    MyRotaComponent,
    CreateOrganisationComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
      { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
      { path: 'Start', component: StartComponent, canActivate: [ AuthGuard ] },
      { path: 'Organisation/:id', component: OrganisationComponent, canActivate: [ AuthGuard ] },
      { path: 'MyRota', component: MyRotaComponent, canActivate: [ AuthGuard ] },
      { path: '**', component: WelcomeComponent }
    ]),
    HttpClientModule
  ],
  providers: [ AuthService, AuthGuard, OrganisationsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
