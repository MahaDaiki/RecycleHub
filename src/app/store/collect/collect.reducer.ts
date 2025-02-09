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
    localStorage.setItem('collects', JSON.stringify(userCollects));

    return {
      ...state,
      collects: [...state.collects, newCollect],
      error: null,
    };
  }),
on(CollectActions.updateCollect, (state, { collect }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;

    if (!userId) {
        return { ...state, error: 'User is not logged in' };
    }

    let userCollects: CollectModel[] = JSON.parse(localStorage.getItem(userId) || '[]');
    userCollects = userCollects.map(c => (c.id === collect.id ? { ...c, ...collect } : c));
    localStorage.setItem(userId, JSON.stringify(userCollects));

    return {
        ...state,
        collects: userCollects,
        error: null,
    };
}),
    on(CollectActions.inProgressUpdateStatus, (state, { collectId, collectorId }) => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        const userId = loggedInUser?.id;


        if (!userId) {
            return { ...state, error: 'User is not logged in' };
        }


        let collects: CollectModel[] = JSON.parse(localStorage.getItem('collects') || '[]');


        collects = collects.map(c =>
            c.id === collectId
                ? { ...c, status: CollectStatus.IN_PROGRESS, collectorId: collectorId }
                : c
        );


        let collected: CollectModel[] = JSON.parse(localStorage.getItem('collected') || '[]');
        const updatedCollect = collects.find(c => c.id === collectId);
        if (updatedCollect) {
            collected.push(updatedCollect);
        }

        // Save both arrays back to localStorage
        localStorage.setItem('collects', JSON.stringify(collects));
        localStorage.setItem('collected', JSON.stringify(collected));

        return {
            ...state,
            collects: collects,
            error: null,
        };
    })

);

