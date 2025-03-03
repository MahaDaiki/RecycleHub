import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ModifyProfileComponent} from "./modify-profile/modify-profile.component";
import {ProfileComponent} from "./profile/profile.component";
import {authGuard} from '../../guard/auth.guard';


import {CollectorProfileComponent} from './collector-profile/collector-profile.component';
import {ConvertpointsComponent} from './convertpoints/convertpoints.component';



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'modify-profile', component: ModifyProfileComponent },
  { path: 'collector', component: CollectorProfileComponent, canActivate: [authGuard], data: { role: 'collector' } },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard], data: { role: 'particulier' } },
  { path: 'convertpoints', component: ConvertpointsComponent, canActivate: [authGuard], data: { role: 'particulier' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule { }
