import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user/user.model';
import { UserService } from '../../entity/user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'avans-tickz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => (this.currentUser = user));
  }

  ngOnInit(): void {
    this.userService.getUserById(this.currentUser._id).subscribe((user) => {
      this.currentUser = user;
    });
  }
}
