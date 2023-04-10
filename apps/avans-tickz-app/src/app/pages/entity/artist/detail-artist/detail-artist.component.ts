import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { Types } from 'mongoose';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { single, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'avans-tickz-detail-artist',
  templateUrl: './detail-artist.component.html',
  styleUrls: ['./detail-artist.component.css'],
})
export class DetailArtistComponent implements OnInit {
  artist!: Artist;
  currentUser!: User;
  favoriteArtist!: boolean;
  relatedArtists!: Artist[];
  artistId!: Types.ObjectId;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.relatedArtists = new Array<Artist>();

    this.route.params.subscribe((params) => {
      this.artistId = new Types.ObjectId(params['artistId']);
      this.relatedArtists.length = 0;

      this.artistService
        .getArtistById(new Types.ObjectId(this.artistId))
        .subscribe((artist) => {
          this.artist = artist;
          // console.log(artist);
          let artistGenres = artist.genre.split(', ');

          this.artistService.getAllArtists().subscribe((artistsArray) => {
            for (let singleArtist of artistsArray) {
              let genres = singleArtist.genre.split(', ');
              for (let genre of genres) {
                for (let artistGenre of artistGenres) {
                  if (genre.toLowerCase() == artistGenre.toLowerCase() && artist._id != singleArtist._id) {
                    this.relatedArtists.push(singleArtist);
                    break;
                  }
                }
              }
            }
          });

          // console.log(this.relatedArtists);

          this.authService.getUserFromLocalStorage().subscribe((user) => {
            this.currentUser = user;
            if (this.currentUser != null) {
              for (let favoriteArtist of user.favoriteArtists) {
                if (favoriteArtist == artist._id) {
                  this.favoriteArtist = true;
                  break;
                }
              }
            }
          });
        });
    });
  }

  addToFavorites(_id: Types.ObjectId) {
    if (!this.favoriteArtist) {
      this.userService.getUserById(this.currentUser._id).subscribe((user) => {
        this.currentUser = user;
        this.artistService.getArtistById(_id).subscribe((artist) => {
          this.userService
            .addToFavoriteArtist(_id, this.currentUser)
            .subscribe((updatedUser) => {
              if (updatedUser != user) {
                this.authService.saveUserToLocalStorage(updatedUser);
                this.toastr.success(
                  'Artist has been added to your favorites',
                  'Favorited!'
                );
              } else {
                this.toastr.error(
                  'Artist was not added to your favorites',
                  'Something went wrong'
                );
              }
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
          .removeFromFavoriteArtist(_id, this.currentUser)
          .subscribe((updatedUser) => {
            if (updatedUser != user) {
              this.toastr.success(
                'Removed',
                'Artist has been removed from your favorites'
              );
              this.authService.saveUserToLocalStorage(updatedUser);
            } else {
              this.toastr.error(
                'Artist was not removed from your favorites',
                'Something went wrong'
              );
            }
            this.router.navigate([`/profile`]);
          });
      });
    }
  }
}
