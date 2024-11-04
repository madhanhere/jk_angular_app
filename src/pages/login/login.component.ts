import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  google() {
    window.open(`${environment.apiUrl}/auth/google`, '_self');
  }

  facebook() {
    window.open(`${environment.apiUrl}/auth/facebook`, '_self');
  }
}
