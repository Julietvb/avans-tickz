import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../entity/user/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'avans-tickz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(email: string, password: string): void {
    this.authService
    .login(email, password)
    .subscribe((user) => {
      if (user) {
        console.log('Logged in');
        this.router.navigate(['/profile'])
        this.router.navigate(['/']);
      }
    });
  }
}
