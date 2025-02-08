import { createReducer, on } from '@ngrx/store';
import * as CollectActions from './collect.actions';
import { CollectModel } from '../../model/collect.model';
import { CollectStatus } from '../../model/enum/collectStatus';

export interface State {
  collects: CollectModel[];
  error: string | null; // Ajouter un champ pour stocker les erreurs
}

export const initialState: State = {
  collects: [],
  error: null,
};

export const collectReducer = createReducer(
  initialState,
  on(CollectActions.addCollect, (state, { collect }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;

    if (!userId) {
      return { ...state, error: 'User is not logged in' };
    }


    let userCollects = JSON.parse(localStorage.getItem(userId) || '[]');


    const newCollectId = userCollects.length ? userCollects[userCollects.length - 1].id + 1 : 1;
    const newCollect: CollectModel = {
      ...collect,
      id: newCollectId,
      userId: userId,
    };

    if (collect.status === CollectStatus.PENDING) {
      const pendingCollects = userCollects.filter((c: CollectModel) => c.status === CollectStatus.PENDING);

      if (pendingCollects.length >= 3) {
        return { ...state, error: 'You can only have 3 pending collections at a time.' };
      }

      const totalWeight = pendingCollects.reduce((sum: number, c: CollectModel) => sum + c.weight, 0);
      if (totalWeight + collect.weight > 10000) {
        return { ...state, error: 'Total weight of pending collections exceeds 10kg.' };
      }
    }


    userCollects.push(newCollect);
    localStorage.setItem(userId, JSON.stringify(userCollects));

    return {
      ...state,
      collects: [...state.collects, newCollect],
      error: null,
    };
  })
);
