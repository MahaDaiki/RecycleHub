import { Component , OnInit } from '@angular/core';
import {CollectModel} from '../../../model/collect.model';
import {CollectStatus} from '../../../model/enum/collectStatus';

@Component({
  selector: 'app-collect-list',
  standalone: false,

  templateUrl: './collect-list.component.html',
  styleUrl: './collect-list.component.css'
})
export class CollectListComponent implements OnInit {
  collects: CollectModel[] = [];
  collectStatus = CollectStatus; // ✅ Exposer l'Enum au template

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;
    this.collects = JSON.parse(localStorage.getItem(userId) || '[]') || [];
  }

  canModify(collect: CollectModel): boolean {
    return collect.status === CollectStatus.PENDING; // ✅ Vérification correcte
  }

  editRequest(collect: CollectModel) {
    alert('Edit feature coming soon for ' + collect.id);
  }

  deleteRequest(requestId: number) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.collects = this.collects.filter((req) => req.id !== requestId);
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      const userId = loggedInUser?.id;
      localStorage.setItem(userId, JSON.stringify(this.collects));
    }
  }
}
