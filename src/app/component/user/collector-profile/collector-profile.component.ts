import { Component } from '@angular/core';
import {CollectService} from '../../../service/collect.service';
import {CollectModel} from '../../../model/collect.model';
import {Router} from '@angular/router';
import {UserModel} from '../../../model/user.model';
import {CollectStatus} from '../../../model/enum/collectStatus';

@Component({
  selector: 'app-collector-profile',
  standalone: false,

  templateUrl: './collector-profile.component.html',
  styleUrl: './collector-profile.component.css'
})
export class CollectorProfileComponent {
  collectedItems: CollectModel[] = [];
  loggedInUser: UserModel | null = null;

  constructor(private router: Router ,private collectService: CollectService) {}

  ngOnInit(): void {

    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log(this.loggedInUser);
    } else {
      console.warn('No logged-in user found in localStorage');
    }

    this.collectService.getCollectedItems().subscribe((items) => {
      this.collectedItems = items;
    });
  }

  editProfile() {
    this.router.navigate(['/modify-profile']);
  }


  onUpdateStatusToAccepted(collect: CollectModel): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const collectorId = loggedInUser?.id;

    if (collectorId) {
      this.collectService.updateStatusToAccepted(collect.id, collectorId);
    }
  }

  onUpdateStatusToRejected(collect: CollectModel): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const collectorId = loggedInUser?.id;

    if (collectorId) {
      this.collectService.updateStatusToRejected(collect.id, collectorId);
    }
  }

  isStatusDisabled(collect: CollectModel, status: CollectStatus): boolean {
    return collect.status === status;
  }


  protected readonly CollectStatus = CollectStatus;
}
