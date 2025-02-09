import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import {UserModel} from '../../../model/user.model';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import {selectLoggedInUser} from '../../../store/user/user.selectors';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loggedInUser$: Observable<UserModel | null>;
  loginErrorMessage: string = '';

  constructor(private floginb: FormBuilder,private store: Store,private userService: UserService,private router: Router) {
    this.loginForm = this.floginb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loggedInUser$ = this.store.select(selectLoggedInUser);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.userService.login(email, password);
    this.loggedInUser$.subscribe((user) => {
      if (user) {
        // Reset error message on successful login
        this.loginErrorMessage = '';

        // Navigate based on the user role
        if (user.role === 'particulier') {
          this.router.navigate(['/profile']);
        } else if (user.role === 'collector') {
          this.router.navigate(['/collects']);
        }
      } else {
        // Show error message if login fails
        this.loginErrorMessage = 'Invalid credentials or role';
      }
    });
  }


  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

}
