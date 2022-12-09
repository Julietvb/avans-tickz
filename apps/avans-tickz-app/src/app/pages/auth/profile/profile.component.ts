import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user/user.model';
import { UserService } from '../../entity/user/user.service';
import { AuthService } from '../auth.service';
import { Types } from 'mongoose'

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

  removeFromFavorites(_id: Types.ObjectId) {
    this.userService.getUserById(this.currentUser._id).subscribe((user) => {
      this.currentUser = user;
      for (let i = 0; i < this.currentUser.favoriteArtists.length; i++) {
        if (this.currentUser.favoriteArtists[i]._id == _id) {
          this.currentUser.favoriteArtists.splice(i, 1);
        }
      }
      this.userService
        .updateUser(this.currentUser._id, this.currentUser)
        .subscribe((updatedUser) =>
          this.authService.saveUserToLocalStorage(updatedUser)
        );
    });
  }
}
