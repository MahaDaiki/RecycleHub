import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import {UserModel} from '../../model/user.model';


export const selectUserState = createFeatureSelector<UserState>('user');


export const selectLoggedInUser = createSelector(
  selectUserState,
  (state: UserState) => state.loggedInUser as UserModel | null
);
