import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/entity/user/detail/detail.component';
import { EditComponent } from './pages/entity/user/edit/edit.component';
import { UserComponent } from './pages/entity/user/user.component';

const routes: Routes = [
  {path: 'users', pathMatch: 'full', component: UserComponent},
  {path: 'users/:userId', pathMatch: 'full', component: DetailComponent},
  {path: 'users/:userId/edit', pathMatch: 'full', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
