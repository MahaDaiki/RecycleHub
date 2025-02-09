import {CollectModel} from '../../model/collect.model';
import {createAction, props} from '@ngrx/store';


export const addCollect = createAction(
  '[Collect] Add Collect',
  props<{ collect: CollectModel }>()
);
export const updateCollect = createAction(
    '[Collect] Update Collect',
    props<{ collect: CollectModel }>()
);
export const inProgressUpdateStatus = createAction(
    '[Collect] In Progress Update Status',
    props<{ collectId: number, collectorId: number }>()
);
export const acceptedUpdateStatus = createAction(
    '[Collect] Accepted Update Status',
    props<{ collectId: number; collectorId: number }>()
);

export const rejectedUpdateStatus = createAction(
    '[Collect] Rejected Update Status',
    props<{ collectId: number; collectorId: number }>()
);
export const convertPoints = createAction(
    '[Collect] Convert Points',
    props<{ userId: number; pointsToExchange: number }>()
);

