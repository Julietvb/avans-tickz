import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserComponent } from './pages/entity/user/user.component';
import { NavComponent } from './shared/nav/nav.component';
import { DetailComponent } from './pages/entity/user/detail/detail.component';
import { ConcertComponent } from './pages/entity/concert/concert.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavComponent,
    DetailComponent,
    ConcertComponent,
  ],
  imports: [BrowserModule, RoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
