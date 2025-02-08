import {CollectModel} from '../../model/collect.model';
import {createAction, props} from '@ngrx/store';


export const addCollect = createAction(
  '[Collect] Add Collect',
  props<{ collect: CollectModel }>()
);
