import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { Types } from 'mongoose';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-tickz-detail-artist',
  templateUrl: './detail-artist.component.html',
  styleUrls: ['./detail-artist.component.css'],
})
export class DetailArtistComponent implements OnInit {
  artistId = new Types.ObjectId(this.route.snapshot.paramMap.get('artistId')!);
  artist!: Artist;
  currentUser!: User;
  favoriteArtist!: boolean;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.artistService.getArtistById(this.artistId).subscribe((artist) => {
      this.artist = artist;
      console.log(artist);
      this.authService.getUserFromLocalStorage().subscribe((user) => {
        this.currentUser = user;
        for (let favoriteArtist of user.favoriteArtists) {
          if (favoriteArtist._id == this.artist._id) {
            this.favoriteArtist = true;
            break;
          }
        }
      });
    });
  }

  addToFavorites(_id: Types.ObjectId) {
    if (!this.favoriteArtist) {
      this.userService.getUserById(this.currentUser._id).subscribe((user) => {
        this.currentUser = user;
        this.artistService.getArtistById(_id).subscribe((artist) => {
          this.currentUser.favoriteArtists.push(artist);
          this.userService
            .updateUser(this.currentUser._id, this.currentUser)
            .subscribe((updatedUser) => {
              this.authService.saveUserToLocalStorage(updatedUser);
              this.router.navigate([`/profile`]);
            });
        });
      });
    }
  }

  removeFromFavorites(_id: Types.ObjectId) {
    if (this.favoriteArtist) {
      this.userService.getUserById(this.currentUser._id).subscribe((user) => {
        this.currentUser = user;
        for (let i = 0; i < this.currentUser.favoriteArtists.length; i++) {
          if (this.currentUser.favoriteArtists[i]._id == _id) {
            this.currentUser.favoriteArtists.splice(i, 1);
          }
        }
        this.userService
          .updateUser(this.currentUser._id, this.currentUser)
          .subscribe((updatedUser) => {
            this.authService.saveUserToLocalStorage(updatedUser);
            this.router.navigate([`/profile`]);
          });
      });
    }
  }
}
