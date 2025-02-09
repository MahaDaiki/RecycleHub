import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../model/user.model';
import {Router} from "@angular/router";
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  loggedInUser: UserModel | null = null;

  constructor( private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {

    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log(this.loggedInUser);
    } else {
      console.warn('No logged-in user found in localStorage');
    }

  }
  editProfile() {
    this.router.navigate(['/modify-profile']);
  }

  deleteProfile(): void {
    const confirmation = confirm('Are you sure you want to delete your account? This action is irreversible.');

    if (confirmation && this.loggedInUser) {
      this.userService.deleteUser(this.loggedInUser.id);
      alert('User deleted successfully');
      this.router.navigate(['/login']);
    }
  }

  getUserPoints(): number {
    if (!this.loggedInUser) return 0;
    const userPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');
    return userPoints[this.loggedInUser.id] || 0;
  }


  convertPoints(): void {

    // this.router.navigate(['/convertpoints']);
  }

}
