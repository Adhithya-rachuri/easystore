import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {Routes, RouterModule} from '@angular/router';
import { DetailspageComponent } from './detailspage/detailspage.component';
import { PatientregistrationComponent } from './patientregistration/patientregistration.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { HomepageComponent } from './homepage/homepage.component';

const appRoutes : Routes =[
  {path:'', component:HomepageComponent},
  {path:'auth', component:AuthComponent},
  {path:'detailspage',component:DetailspageComponent},
  {path:'registration', component:PatientregistrationComponent},
  {path:'homepage', component:HomepageComponent},
  {path:'myProfile', component:DetailspageComponent},
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DetailspageComponent,
    PatientregistrationComponent,
    SidenavbarComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

