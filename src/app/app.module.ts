import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselimagesComponent } from './carouselimages/carouselimages.component';

const appRoutes: Routes = [
  { path : '', component : CarouselimagesComponent },
  { path : 'login', component : LoginComponent },
  { path : 'registration', component : RegistrationComponent },
  { path : 'home', component : HomeComponent }

  
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    SidebarComponent,
    CarouselimagesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
