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
