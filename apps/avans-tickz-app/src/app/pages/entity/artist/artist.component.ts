import { Types } from 'mongoose';
import { Component, OnInit } from '@angular/core';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-tickz-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artists!: Artist[];
  currentUser!: User;
  dateFormat!: Date;
  userAuthenticated!: boolean;

  constructor(
    private artistService: ArtistService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.artistService
      .getAllArtists()
      .subscribe((artists) => (this.artists = artists));

    this.authService.getUserFromLocalStorage().subscribe((user) => {
      this.currentUser = user;
      if (user == undefined) {
        this.userAuthenticated = false;
      } else {
        this.userAuthenticated = true;
      }
    });

    console.log(this.currentUser.favoriteArtists);
  }
}
