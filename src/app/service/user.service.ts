import { Injectable } from '@angular/core';
import {UserModel} from '../model/user.model';
import * as bcrypt from 'bcryptjs';
import {Store} from '@ngrx/store';
import {loginUser, logoutUser, registerUser, updateUserProfile, deleteUser} from '../store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store: Store) {}

  registerUser(user: UserModel): boolean {

    this.store.dispatch(registerUser({ user }));

    return true;
  }

  login(email: string, password: string): boolean {
    this.store.dispatch(loginUser({ email, password }));
    return true;
  }

  logout(): void {
    this.store.dispatch(logoutUser());
  }

  updateUserProfile(updatedUser: UserModel) {
    this.store.dispatch(updateUserProfile({ updatedUser }));
  }

  deleteUser(userId: number): void {
    this.store.dispatch(deleteUser({ userId }));
  }

}
