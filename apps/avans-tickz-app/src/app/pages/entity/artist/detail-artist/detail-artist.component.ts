import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { Types } from 'mongoose';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'avans-tickz-detail-artist',
  templateUrl: './detail-artist.component.html',
  styleUrls: ['./detail-artist.component.css'],
})
export class DetailArtistComponent implements OnInit {
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
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.artistService.getArtistById(
            new Types.ObjectId(params.get('artistId')!)
          )
        )
      )
      .subscribe((artist) => {
        this.artist = artist;
        console.log(artist);

        this.authService.getUserFromLocalStorage().subscribe((user) => {
          this.currentUser = user;
          for (let favoriteArtist of user.favoriteArtists) {
            if (favoriteArtist._id == artist._id) {
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
