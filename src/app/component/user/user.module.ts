import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import {UserService} from '../../service/user.service';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {ModifyProfileComponent} from "./modify-profile/modify-profile.component";
import {ProfileComponent} from "./profile/profile.component";
import {CollectModule} from '../collect/collect.module';
import { CollectorProfileComponent } from './collector-profile/collector-profile.component';
import {ConvertpointsComponent} from './convertpoints/convertpoints.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ModifyProfileComponent,
    CollectorProfileComponent,
    ConvertpointsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CollectModule,
  ],
  providers: [UserService]
})
export class UserModule { }
