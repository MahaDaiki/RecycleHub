import { Injectable } from '@angular/core';
import {CollectModel} from '../model/collect.model';
import {Store} from '@ngrx/store';
import * as CollectActions from '../store/collect/collect.actions';
import {CollectStatus} from "../model/enum/collectStatus";

@Injectable({
  providedIn: 'root'
})
export class CollectService {

  constructor(private store: Store) {}


  addCollect(collect: CollectModel): void {
    this.store.dispatch(CollectActions.addCollect({ collect }));
  }

  updateCollect(collect: CollectModel): void {
    if (collect.status !== CollectStatus.PENDING) return;
    this.store.dispatch(CollectActions.updateCollect({ collect }));
  }

}
