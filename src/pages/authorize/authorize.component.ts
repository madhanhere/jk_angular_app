import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-authorize',
  standalone: true,
  templateUrl: './auhtorize.component.html',
  imports: []
})
export class AuthorizeComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jwtUser = params['jwtUser'];

      if (jwtUser) {
        const userFromJWT = jwtDecode(jwtUser);
        localStorage.setItem('token', jwtUser);
        localStorage.setItem('user', JSON.stringify(userFromJWT));
        this.router.navigate(['/']);
      }

    });
  }
}
