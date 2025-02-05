import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {UserEffects} from './state/user.effects.effects';
import {EffectsModule} from '@ngrx/effects';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import {UserService} from '../../service/user.service';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    // EffectsModule.forFeature([UserEffects]),
    UserRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UserService]
})
export class UserModule { }
