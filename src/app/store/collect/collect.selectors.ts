import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './collect.reducer';

export const selectCollectState = createFeatureSelector<State>('collect');

export const selectError = createSelector(
  selectCollectState,
  (state) => state ? state.error : null
);

