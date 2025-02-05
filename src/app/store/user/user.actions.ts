import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../model/user.model';

export const registerUser = createAction(
  '[User] Register',
  props<{ user: UserModel }>()
);

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ users: any[] }>()
);

export const loginUser = createAction(
    '[User] Login',
    props<{ email: string; password: string }>()
);

export const logoutUser = createAction('[User] Logout');
