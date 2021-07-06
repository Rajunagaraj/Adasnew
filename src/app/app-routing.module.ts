import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/Login', 
    pathMatch: 'full' 
  },
  { path: 'Login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
   { path: '', loadChildren: () => import('./od-page/od-page.module').then(m => m.ODPageModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
