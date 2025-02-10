import { createReducer, on } from '@ngrx/store';
import * as CollectActions from './collect.actions';
import { CollectModel } from '../../model/collect.model';
import { CollectStatus } from '../../model/enum/collectStatus';
import {WasteType} from "../../model/enum/wasteType";

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


    let allCollects: CollectModel[] = JSON.parse(localStorage.getItem('collects') || '[]');


    const newCollectId = allCollects.length ? allCollects[allCollects.length - 1].id + 1 : 1;

    const newCollect: CollectModel = {
      ...collect,
      id: newCollectId,
      userId: userId,
    };

    const collectionDate = new Date(collect.collectionDate);
    const currentDate = new Date();

    if (collectionDate < currentDate) {
      return { ...state, error: 'Collection date cannot be in the past.' };
    }

    if (collect.status === CollectStatus.PENDING) {


      const pendingCollectsForUser = allCollects.filter(
        (c: CollectModel) => c.userId === userId && c.status === CollectStatus.PENDING
      );

      if (pendingCollectsForUser.length >= 3) {
        return { ...state, error: 'You can only have 3 pending collections at a time.' };
      }
      const totalWeight = pendingCollectsForUser.reduce((sum: number, c: CollectModel) => sum + c.weight, 0);
      if (totalWeight + collect.weight > 10000) {
        return { ...state, error: 'Total weight of pending collections exceeds 10kg.' };
      }
    }


    allCollects.push(newCollect);
    localStorage.setItem('collects', JSON.stringify(allCollects));

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


        // localStorage.setItem('collects', JSON.stringify(collects));
        localStorage.setItem('collected', JSON.stringify(collected));

        return {
            ...state,
            collects: collects,
            error: null,
        };
    }),

    on(CollectActions.acceptedUpdateStatus, (state, { collectId, collectorId }) => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        const userId = loggedInUser?.id;

        if (!userId) {
            return { ...state, error: 'User is not logged in' };
        }

        let collects: CollectModel[] = JSON.parse(localStorage.getItem('collects') || '[]');
        let collected: CollectModel[] = JSON.parse(localStorage.getItem('collected') || '[]');

        let totalPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');

        collects = collects.map(c => {
            if (c.id === collectId) {
                const userId = c.userId;
                if (!userId) return c;

                const weightInKg = c.weight / 1000;

                const pointsEarned = c.wasteTypes.reduce((sum, wasteType) => {
                    switch (wasteType) {
                        case WasteType.PLASTIC:
                            return sum + weightInKg * 2;
                        case WasteType.GLASS:
                            return sum + weightInKg * 1;
                        case WasteType.PAPER:
                            return sum + weightInKg * 1.5;
                        case WasteType.METAL:
                            return sum + weightInKg * 3;
                        default:
                            return sum;
                    }
                }, 0);

                totalPoints[userId] = (totalPoints[userId] || 0) + pointsEarned;


                return { ...c, status: CollectStatus.ACCEPTED, collectorId: collectorId };
            }
            return c;
        });

        collected = collected.map(c =>
            c.id === collectId
                ? { ...c, status: CollectStatus.ACCEPTED, collectorId: collectorId }
                : c
        );

        localStorage.setItem('collects', JSON.stringify(collects));
        localStorage.setItem('collected', JSON.stringify(collected));
        localStorage.setItem('userPoints', JSON.stringify(totalPoints));

        return {
            ...state,
            collects: collects,
            error: null,
        };
    }),

    on(CollectActions.rejectedUpdateStatus, (state, { collectId, collectorId }) => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        const userId = loggedInUser?.id;

        if (!userId) {
            return { ...state, error: 'User is not logged in' };
        }

        let collects: CollectModel[] = JSON.parse(localStorage.getItem('collects') || '[]');
        let collected: CollectModel[] = JSON.parse(localStorage.getItem('collected') || '[]');

        collects = collects.map(c =>
            c.id === collectId
                ? { ...c, status: CollectStatus.REJECTED, collectorId: collectorId }
                : c
        );

        collected = collected.map(c =>
            c.id === collectId
                ? { ...c, status: CollectStatus.REJECTED, collectorId: collectorId }
                : c
        );

        localStorage.setItem('collects', JSON.stringify(collects));
        localStorage.setItem('collected', JSON.stringify(collected));

        return {
            ...state,
            collects: collects,
            error: null,
        };
    }),


    on(CollectActions.convertPoints, (state, { userId, pointsToExchange }) => {
        let totalPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');

        if (!totalPoints[userId] || totalPoints[userId] < pointsToExchange) {
            return { ...state, error: "Insufficient points" };
        }


        const conversionRates = [
            { points: 500, money: 350 },
            { points: 200, money: 120 },
            { points: 100, money: 50 },
        ];

        let moneyEarned = 0;
        let remainingPoints = pointsToExchange;

        for (const rate of conversionRates) {
            while (remainingPoints >= rate.points) {
                moneyEarned += rate.money;
                remainingPoints -= rate.points;
            }
        }

        if (remainingPoints > 0) {
            return { ...state, error: "Invalid point amount. Choose 100, 200, or 500." };
        }

        totalPoints[userId] -= pointsToExchange;


        localStorage.setItem('userPoints', JSON.stringify(totalPoints));
      let history = JSON.parse(localStorage.getItem('history') || '[]');

      history.push({
        userId,
        pointsConverted: pointsToExchange,
        moneyReceived: moneyEarned,
        timestamp: new Date().toISOString()
      });

      localStorage.setItem('history', JSON.stringify(history));

        return {
            ...state,
            totalPoints,
            success: `Successfully exchanged ${pointsToExchange} points for ${moneyEarned} Dh!`,
        };
    }),


);

