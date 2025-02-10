import { Component } from '@angular/core';
import {logoutUser} from '../../../store/user/user.actions';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedInUser: any = null;
  isMenuOpen: boolean = false;
  userRole: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('loggedInUser');
    console.log(user)
    if (user) {
      this.loggedInUser = JSON.parse(user);
      this.userRole = this.loggedInUser.role;

    }
  }

  logout(): void {
    this.userService.logout();
    this.loggedInUser = null;
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
