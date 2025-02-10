import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnauthorizedComponent} from './component/shared/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', loadChildren: () => import('./component/user/user.module').then(m => m.UserModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
