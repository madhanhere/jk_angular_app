import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated: boolean = false;

  constructor() {
    this.authenticated = !!localStorage.getItem('token');
  }

  isAuthenticated() {
    return of(this.authenticated);
  }
}
