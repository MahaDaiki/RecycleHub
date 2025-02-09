import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../model/user.model';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import bcrypt from 'bcryptjs';

@Component({
  selector: 'app-modify-profile',
  standalone: false,

  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.css'
})
export class ModifyProfileComponent implements OnInit{
  modifyProfileForm: FormGroup | undefined;
  loggedInUser: UserModel | null = null;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log(this.loggedInUser);


      this.modifyProfileForm = this.fb.group({
        id: [this.loggedInUser!.id, Validators.required],
        fullName: [this.loggedInUser!.fullName, Validators.required],
        email: [this.loggedInUser!.email, [Validators.required, Validators.email]],
        phoneNumber: [this.loggedInUser!.phoneNumber, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        address: [this.loggedInUser!.address, Validators.required],
        dateOfBirth: [this.loggedInUser!.dateOfBirth, Validators.required],
        role: [this.loggedInUser!.role, Validators.required],
        profilePicture: [this.loggedInUser!.profilePicture],

        oldPassword: [this.loggedInUser!.password, [Validators.required, Validators.minLength(6)]],
        newPassword: ['', Validators.minLength(6)],
        confirmNewPassword: ['', Validators.minLength(6)]
      });
    } else {
      console.warn('No logged-in user found in localStorage');
      this.router.navigate(['/login']);
    }
  }
  onOldPasswordInput(): void {
    const oldPassword = this.modifyProfileForm!.get('oldPassword')?.value.trim();
    this.showNewPassword = oldPassword.length > 0;

    if (!this.showNewPassword) {
      this.modifyProfileForm!.get('newPassword')?.setValue('');
      this.modifyProfileForm!.get('confirmNewPassword')?.setValue('');
      this.showConfirmPassword = false;
    }
  }

  onNewPasswordInput(): void {
    const newPassword = this.modifyProfileForm!.get('newPassword')?.value.trim();
    this.showConfirmPassword = newPassword.length > 0;

    if (!this.showConfirmPassword) {
      this.modifyProfileForm!.get('confirmNewPassword')?.setValue('');
    }
  }


  onSubmit(): void {
    if (this.modifyProfileForm!.valid) {
      const formValues = this.modifyProfileForm!.value;

      if (this.loggedInUser) {
        const isPasswordCorrect = bcrypt.compareSync(formValues.oldPassword, this.loggedInUser.password);
        if (!isPasswordCorrect) {
          alert('Old password is incorrect!');
          return;
        }

        const updatedUser: UserModel = {
          id: this.loggedInUser.id,
          fullName: formValues.fullName,
          email: formValues.email,
          address:formValues.address,
          phoneNumber: formValues.phoneNumber,
          dateOfBirth: formValues.dateOfBirth,
          profilePicture: formValues.profilePicture,
          role: formValues.role,
          password: this.loggedInUser.password,
        };

        if (formValues.newPassword?.trim()) {
          if (formValues.newPassword !== formValues.confirmNewPassword) {
            alert('Passwords do not match');
            return;
          }
          updatedUser.password = bcrypt.hashSync(formValues.newPassword, 10);
        }

        this.userService.updateUserProfile(updatedUser);
        alert('Profile updated successfully!');

        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        this.router.navigate(['/profile']);
      }
    } else {
      alert('Form is invalid! Please check your inputs.');
      console.log('Form errors:', this.modifyProfileForm!.value);
    }
  }




}
