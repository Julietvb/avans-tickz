import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { skip } from 'rxjs';
import { User } from '../../entity/user/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'avans-tickz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validLogin!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.validLogin = true;
  }

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe((user) => {
      if (user) {
        this.toastr.success('You are now logged in', 'Log in successful');
      } else {
        this.toastr.error(
          'You are not successfully logged in',
          'Something went wrong'
        );
        this.validLogin = false;
      }
    });
    this.router.navigate([`/`]);
  }
}
