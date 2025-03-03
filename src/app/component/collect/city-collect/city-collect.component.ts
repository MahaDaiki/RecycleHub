import { Component } from '@angular/core';
import {CollectService} from '../../../service/collect.service';
import {CollectModel} from '../../../model/collect.model';
import {CollectStatus} from '../../../model/enum/collectStatus';

@Component({
  selector: 'app-city-collect',
  standalone: false,

  templateUrl: './city-collect.component.html',
  styleUrl: './city-collect.component.css'
})
export class CityCollectComponent {
  pendingCollects: CollectModel[] = [];

  constructor(private collectService: CollectService) {}

  ngOnInit(): void {
    this.pendingCollects = this.collectService.getPendingCollects();
  }

  onUpdateStatusToInProgress(collect: CollectModel): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const collectorId = loggedInUser?.id;

    if (collectorId) {
      this.collectService.updateStatusToInProgress(collect.id, collectorId);
    }
  }

  protected readonly collectStatus = CollectStatus;
}
