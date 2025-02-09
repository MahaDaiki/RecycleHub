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

  getUserAddress(): string {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    return loggedInUser?.address || '';
  }

  getPendingCollects(): CollectModel[] {
    const userAddress = this.getUserAddress();
    if (!userAddress) return [];

    const allCollects: CollectModel[] = JSON.parse(localStorage.getItem('collects') || '[]');

    return allCollects.filter(
        (collect) => collect.address === userAddress && collect.status === CollectStatus.PENDING
    );
  }

  updateStatusToInProgress(collectId: number, collectorId: number): void {
    this.store.dispatch(CollectActions.inProgressUpdateStatus({ collectId, collectorId }));
  }

}
