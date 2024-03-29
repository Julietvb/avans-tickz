import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ArtistComponent } from './pages/entity/artist/artist.component';
import { CreateArtistComponent } from './pages/entity/artist/create-artist/create-artist.component';
import { DetailArtistComponent } from './pages/entity/artist/detail-artist/detail-artist.component';
import { EditArtistComponent } from './pages/entity/artist/edit-artist/edit-artist.component';
import { ConcertComponent } from './pages/entity/concert/concert.component';
import { CreateConcertComponent } from './pages/entity/concert/create-concert/create-concert.component';
import { DetailConcertComponent } from './pages/entity/concert/detail-concert/detail-concert.component';
import { EditConcertComponent } from './pages/entity/concert/edit-concert/edit-concert.component';
import { DetailComponent } from './pages/entity/user/detail/detail.component';
import { EditComponent } from './pages/entity/user/edit/edit.component';
import { UserComponent } from './pages/entity/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'profile', pathMatch: 'full', component: ProfileComponent },
  { path: 'users/:userId/edit', pathMatch: 'full', component: EditComponent },
  { path: 'users/:userId', pathMatch: 'full', component: DetailComponent },
  { path: 'users', pathMatch: 'full', component: UserComponent },
  { path: 'concerts', pathMatch: 'full', component: ConcertComponent },
  { path: 'concerts/create', pathMatch: 'full', component: CreateConcertComponent },
  { path: 'concerts/:concertId', pathMatch: 'full', component: DetailConcertComponent },
  { path: 'concerts/:concertId/edit', pathMatch: 'full', component: EditConcertComponent },
  { path: 'artists', pathMatch: 'full', component: ArtistComponent },
  { path: 'artists/create', pathMatch: 'full', component: CreateArtistComponent },
  { path: 'artists/:artistId', pathMatch: 'full', component: DetailArtistComponent },
  { path: 'artists/:artistId/edit', pathMatch: 'full', component: EditArtistComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
