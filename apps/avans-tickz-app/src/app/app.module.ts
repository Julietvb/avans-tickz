import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './pages/entity/user/user.component';
import { NavComponent } from './shared/nav/nav.component';
import { DetailComponent } from './pages/entity/user/detail/detail.component';
import { ConcertComponent } from './pages/entity/concert/concert.component';
import { EditComponent } from './pages/entity/user/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { DatePipe } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';


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
  ],
  imports: [BrowserModule, RoutingModule, NgbModule, FormsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
