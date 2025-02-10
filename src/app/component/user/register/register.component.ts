import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../model/user.model';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  profilePreview: string | ArrayBuffer | null = null;


  constructor(private fregisterb: FormBuilder,private userService: UserService) {
    this.registerForm = this.fregisterb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      role: ['particulier'],
      profilePicture: [''],
    }, { validators: this.passwordsMatch });
  }

  private passwordsMatch(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePreview = reader.result;
        this.registerForm.patchValue({ profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;


      const users = JSON.parse(localStorage.getItem('users') || '[]');

      let lastUserId = localStorage.getItem('lastUserId');
      let newId = lastUserId ? Number(lastUserId) + 1 : 1;

      localStorage.setItem('lastUserId', String(newId));

      const user: UserModel = new UserModel(
        newId,
        formData.email,
        formData.password,
        formData.fullName,
        formData.phoneNumber,
        formData.address,
        formData.dateOfBirth,
        formData.role,
        formData.profilePicture
      );
      if (this.userService.registerUser(user)) {
        alert('User registered successfully');
        this.registerForm.reset();
      } else {
        alert('Email is already taken');
      }
    } else {
      alert('Form is invalid');
    }
  }

}
