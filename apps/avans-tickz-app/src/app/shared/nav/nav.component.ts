import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';
import { User } from '../../pages/entity/user/user.model';

@Component({
  selector: 'avans-tickz-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  currentUser!: User;
  userAuthenticated!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('nav onInit called')
    this.authService.getUserFromLocalStorage().subscribe((user) => {
      this.currentUser = user;
      if (user == undefined) {
        this.userAuthenticated = false;
      } else {
        this.userAuthenticated = true;
      }
    });
  }
}
