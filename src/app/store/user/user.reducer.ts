import { createReducer, on } from '@ngrx/store';
import {registerUser, loadUsers, logoutUser, loginUser} from './user.actions';
import bcrypt from 'bcryptjs';
import {UserModel} from '../../model/user.model';

export interface UserState {
  users: UserModel[];
}
const initialUsers: UserModel[] = JSON.parse(localStorage.getItem('users') || '[]');
if (initialUsers.length === 0) {
  initialUsers.push(
    {
      id:1,
      fullName: 'collector1',
      email: 'collector1@email.com',
      password: bcrypt.hashSync('password123', 10),
      phoneNumber: '1234567890',
      address: 'Safi',
      dateOfBirth: '1998-01-01',
      role: 'collector',
      profilePicture: '',
    },
    {
      id:2,
      fullName: 'collector2',
      email: 'collector2@email.com',
      password: bcrypt.hashSync('password123', 10),
      phoneNumber: '0987654321',
      address: 'Eljadida',
      dateOfBirth: '1999-05-15',
      role: 'collector',
      profilePicture: '',
    },
  );
}

export const initialState: UserState = {
  users: initialUsers,
};


export const userReducer = createReducer(
  initialState,
  on(registerUser, (state, { user }) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const birthDate = new Date(user.dateOfBirth);
    const currentYear = new Date().getFullYear();
    const userAge = currentYear - birthDate.getFullYear();

    if (birthDate > new Date() || userAge > 100 || userAge < 18) {
      throw new Error('Invalid date of birth');
    }
    const updatedUsers = [...state.users, { ...user, password: hashedPassword }];

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return {
      ...state,
      users: updatedUsers,
    };
  }),

  on(loadUsers, (state, { users }) => {
    localStorage.setItem('users', JSON.stringify(users));
    return {
      ...state,
      users,
    };
  }),

on(loginUser, (state, { email, password }) => {
    const user = state.users.find(u => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        alert('Invalid credentials');
        return state;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    return {
        ...state,
        loggedInUser: user,
    };
}),


    on(logoutUser, (state) => {
        localStorage.removeItem('loggedInUser');
        return {
            ...state,
            loggedInUser: null,
        };
    })
);
