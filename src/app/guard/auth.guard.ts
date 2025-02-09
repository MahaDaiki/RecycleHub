import { inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectLoggedInUser } from '../store/user/user.selectors';
import { UserModel } from '../model/user.model';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectLoggedInUser).pipe(
    take(1),
    map((loggedInUser: UserModel | null) => {
      if (!loggedInUser) {
        // router.navigate(['/login']);
        return false;
      }

      const requiredRole = route.data['role'];


      if (requiredRole && loggedInUser.role !== requiredRole) {
        router.navigate(['/unauthorized']);
        return false;
      }


      return true;
    })
  );
};
