import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ConcertComponent } from './pages/entity/concert/concert.component';
import { CreateConcertComponent } from './pages/entity/concert/create-concert/create-concert.component';
import { DetailConcertComponent } from './pages/entity/concert/detail-concert/detail-concert.component';
import { EditConcertComponent } from './pages/entity/concert/edit-concert/edit-concert.component';
import { DetailComponent } from './pages/entity/user/detail/detail.component';
import { EditComponent } from './pages/entity/user/edit/edit.component';
import { UserComponent } from './pages/entity/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'users', pathMatch: 'full', component: UserComponent },
  { path: 'users/:userId', pathMatch: 'full', component: DetailComponent },
  { path: 'users/:userId/edit', pathMatch: 'full', component: EditComponent },
  { path: 'concerts', pathMatch: 'full', component: ConcertComponent },
  { path: 'concerts/create', pathMatch: 'full', component: CreateConcertComponent },
  { path: 'concerts/:concertId', pathMatch: 'full', component: DetailConcertComponent },
  { path: 'concerts/:concertId/edit', pathMatch: 'full', component: EditConcertComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
