import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CityCollectComponent} from "./city-collect/city-collect.component";
import {authGuard} from "../../guard/auth.guard";


const routes: Routes = [
  { path: 'collects', component: CityCollectComponent, canActivate: [authGuard], data: { role: 'collector' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectRoutingModule { }
