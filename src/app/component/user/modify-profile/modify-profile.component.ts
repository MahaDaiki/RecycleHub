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
        // Compare the plain password with the hashed password stored in localStorage
        const isPasswordCorrect = bcrypt.compareSync(formValues.oldPassword, this.loggedInUser.password);

        if (isPasswordCorrect) {
          if (formValues.newPassword && formValues.newPassword !== formValues.confirmNewPassword) {
            alert('Passwords do not match');
            return;
          }

          const updatedUser = { ...formValues, id: this.loggedInUser?.id };

          // Hash the new password if it's provided
          if (formValues.newPassword) {
            updatedUser.password = bcrypt.hashSync(formValues.newPassword, 10);
          }

          // Call the update profile service
          this.userService.updateUserProfile(updatedUser);
          console.log('Profile updated:', updatedUser);
          alert('Profile updated successfully!');
        } else {
          alert('Old password is incorrect!');
        }
      }
    } else {
      alert('Form is invalid!');
      console.log('Form is invalid:', this.modifyProfileForm!.value);
    }
  }



}
