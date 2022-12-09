import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from './user.model';
import { UserService } from './user.service';
import { Types } from 'mongoose'

@Component({
  selector: 'avans-tickz-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users!: User[];
  usersLength!: Number;
  currentUser!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserFromLocalStorage().subscribe((user) => {
      this.currentUser = user;
      this.userService.getAllUsers().subscribe((users) => {
        for (let i = 0; i < users.length; i++) {
          if (users.at(i)?._id == user._id) {
            users.splice(i, 1);
          }
        }
        this.users = users;
        this.usersLength = users.length;
      });
    });
  }

  follow(user: User){
    this.currentUser.following.push(user);
  }
}
