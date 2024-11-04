import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../pages/login/login.component').then(component => component.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home.component').then(component => component.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    loadComponent: () => import('../pages/post/post.component').then(com => com.PostComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/oauth-success-redirect',
    loadComponent: () => import('../pages/authorize/authorize.component').then(c => c.AuthorizeComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
