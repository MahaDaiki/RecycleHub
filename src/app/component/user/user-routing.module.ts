import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ModifyProfileComponent} from "./modify-profile/modify-profile.component";
import {ProfileComponent} from "./profile/profile.component";



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'modify-profile', component: ModifyProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule { }
