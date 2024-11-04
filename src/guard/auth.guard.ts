import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, take, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLoggedIn(url);
  }

  private checkLoggedIn(url: string): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((isSignedIn: boolean) => {
        if (!isSignedIn) {
          console.log("isSignedIn", url);
          this.router.navigate(['/login']);
        }
      })
    );
  }
}

