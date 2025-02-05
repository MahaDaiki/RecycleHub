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

// export const registerUserSuccess = createAction(
//   '[User] Register Success',
//   props<{ user: UserModel }>()
// );
//
// export const registerUserFailure = createAction(
//   '[User] Register Failure',
//   props<{ error: string }>()
// );
