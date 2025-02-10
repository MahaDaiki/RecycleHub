import { Component , OnInit } from '@angular/core';
import {CollectModel} from '../../../model/collect.model';
import {CollectStatus} from '../../../model/enum/collectStatus';
import {CollectService} from "../../../service/collect.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-collect-list',
  standalone: false,

  templateUrl: './collect-list.component.html',
  styleUrl: './collect-list.component.css'
})
export class CollectListComponent implements OnInit {
  collects: CollectModel[] = [];
  collectStatus = CollectStatus;
  selectedCollect: CollectModel | null = null;
  showPopup = false;
  collectForm!: FormGroup;
  constructor(private datePipe: DatePipe,private collectService: CollectService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadRequests();
    this.initForm();
  }

  initForm() {
    this.collectForm = this.fb.group({
      wasteTypes: [[], Validators.required],
      weight: [null, [Validators.required, Validators.min(1000)]],
      address: ['', Validators.required],
      collectionDate: ['', Validators.required],
      time: ['', Validators.required],
      notes: [''],
      images: [[]],
    });
  }

  loadRequests() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;
    if (userId) {
      const allCollects: CollectModel[] = JSON.parse(localStorage.getItem('collects') || '[]');
      this.collects = allCollects.filter((collect) => collect.userId === userId);
    } else {
      console.warn('No logged-in user found or userId is missing.');
      this.collects = [];
    }
  }

  canModify(collect: CollectModel): boolean {
    return collect.status === CollectStatus.PENDING;
  }



  editRequest(collect: CollectModel) {
    if (!this.canModify(collect)) return;
    this.selectedCollect = { ...collect };
    this.collectForm.patchValue(collect);
    this.showPopup = true;
  }

  saveChanges() {
    if (this.collectForm.valid && this.selectedCollect) {
      const updatedCollect = { ...this.selectedCollect, ...this.collectForm.value };

      this.collectService.updateCollect(updatedCollect);

      const index = this.collects.findIndex((c) => c.id === updatedCollect.id);
      if (index !== -1) {
        this.collects[index] = updatedCollect;
      }

      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      const userId = loggedInUser?.id;
      localStorage.setItem(userId, JSON.stringify(this.collects));

      this.showPopup = false;
    }
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
