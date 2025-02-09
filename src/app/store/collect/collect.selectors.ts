import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './collect.reducer';
import {UserState} from "../user/user.reducer";
import {selectUserState} from "../user/user.selectors";

export const selectCollectState = createFeatureSelector<State>('collect');

export const selectError = createSelector(
  selectCollectState,
  (state) => state ? state.error : null
);

export const selectLoggedInUser = createSelector(
    selectUserState,
    (state: UserState) => state.loggedInUser
);

