import { Component } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-convertpoints',
  standalone: false,

  templateUrl: './convertpoints.component.html',
  styleUrl: './convertpoints.component.css'
})
export class ConvertpointsComponent {
  pointsForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  remainingPoints: number = 0;
  errorMessage$: Observable<string | null> | undefined;
  history: any[] = [];


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
    this.pointsForm = this.fb.group({
      points: [null, [Validators.required, Validators.min(100), Validators.pattern(/^(100|200|500)$/)]], // Limite aux valeurs autorisées
    });

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;
    if (userId) {
      const totalPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');
      this.remainingPoints = totalPoints[userId] || 0;
    }
  }
  get points() {
    return this.pointsForm.get('points');
  }

  loadHistory(): void {
    const storedHistory = localStorage.getItem('history');
    this.history = storedHistory ? JSON.parse(storedHistory) : [];
  }


  convertPoints(): void {
    if (this.pointsForm.invalid) {
      return;
    }

    const pointsToConvert = this.pointsForm.value.points;
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;

    if (!userId) {
      this.errorMessage = 'User is not logged in';
      return;
    }

    this.userService.convertPointsAction(userId, pointsToConvert);
    this.successMessage = `Successfully exchanged points!`;


    this.loadHistory();


    setTimeout(() => {
      const state = JSON.parse(localStorage.getItem('state') || '{}');
      const totalPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');

      this.remainingPoints = totalPoints[userId] || 0;

      if (state.error) {
        this.errorMessage = state.error;
        this.successMessage = null;
      } else if (state.success) {
        this.successMessage = state.success;
        this.errorMessage = null;
      }
    }, 100);
  }
}
