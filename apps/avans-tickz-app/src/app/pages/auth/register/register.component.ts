import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../entity/user/user.model';
import { UserService } from '../../entity/user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'avans-tickz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerUser(user: User): void {
    this.authService.register(user).subscribe((user) => {
      if (user) {
        console.log('user = ', user);
        this.router.navigate(['./users']);
      }
    });
    this.authService.login(user.emailAdres, user.password).subscribe((user) => {
      if (user) {
        console.log('Logged in');
        this.router.navigate(['/']);
      }
    });
  }
}
