import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { UserComponent } from './pages/entity/user/user.component';
import { NavComponent } from './shared/nav/nav.component';
import { DetailComponent } from './pages/entity/user/detail/detail.component';
import { ConcertComponent } from './pages/entity/concert/concert.component';
import { EditComponent } from './pages/entity/user/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { DatePipe } from '@angular/common';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { EditConcertComponent } from './pages/entity/concert/edit-concert/edit-concert.component';
import { DetailConcertComponent } from './pages/entity/concert/detail-concert/detail-concert.component';
import { CreateConcertComponent } from './pages/entity/concert/create-concert/create-concert.component';
import { LoginComponent } from './pages/auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavComponent,
    DetailComponent,
    ConcertComponent,
    EditComponent,
    HomeComponent,
    RegisterComponent,
    AboutComponent,
    EditConcertComponent,
    DetailConcertComponent,
    CreateConcertComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, RoutingModule, NgbModule, FormsModule, HttpClientModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
