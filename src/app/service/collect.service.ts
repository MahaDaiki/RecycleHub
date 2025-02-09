import { Injectable } from '@angular/core';
import {CollectModel} from '../model/collect.model';
import {Store} from '@ngrx/store';
import * as CollectActions from '../store/collect/collect.actions';
import {CollectStatus} from "../model/enum/collectStatus";
import {Observable} from "rxjs";

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
        (collect) => collect.address.toLowerCase() === userAddress.toLowerCase() && collect.status === CollectStatus.PENDING
    );
  }

  updateStatusToInProgress(collectId: number, collectorId: number): void {
    this.store.dispatch(CollectActions.inProgressUpdateStatus({ collectId, collectorId }));
  }

  getCollectedItems(): Observable<CollectModel[]> {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const collectorId = loggedInUser?.id;


    let collects: CollectModel[] = JSON.parse(localStorage.getItem('collected') || '[]');
    const collectedItems = collects.filter((collect) => collect.collectorId === collectorId);
    return new Observable((observer) => observer.next(collectedItems));
  }

  updateStatusToAccepted(collectId: number, collectorId: number) {
    this.store.dispatch(CollectActions.acceptedUpdateStatus({ collectId, collectorId }));
  }

  updateStatusToRejected(collectId: number, collectorId: number) {
    this.store.dispatch(CollectActions.rejectedUpdateStatus({ collectId, collectorId }));
  }

}
