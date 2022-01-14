import { UserauthguardGuard } from './userauthguard.guard';
import { VideogamelistComponent } from './videogamelist/videogamelist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideogameeditComponent } from './videogameedit/videogameedit.component';

const routes: Routes = [
  { path: 'videogame-list', component: VideogamelistComponent },
  { path: 'videogame-edit/:id', component: VideogameeditComponent,canActivate:[UserauthguardGuard] },
  { path: 'videogame-edit', component: VideogameeditComponent,canActivate:[UserauthguardGuard] },
  { path: '',   redirectTo: '/videogame-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
