import { Component, OnInit } from '@angular/core';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Artist } from '../entity/artist/artist.model';
import { ArtistService } from '../entity/artist/artist.service';
import { User } from '../entity/user/user.model';

@Component({
  selector: 'avans-tickz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedInUser!: User;
  reccommendations!: Artist[];
  randomArtists!: Artist[];

  constructor(
    private authService: AuthService,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.reccommendations = new Array<Artist>();

    this.authService.getUserFromLocalStorage().subscribe((user) => {
      this.loggedInUser = user;

      this.authService.getReccommendations().subscribe((recs) => {
        this.reccommendations = recs;
      });

      this.artistService.getAllArtists().subscribe((artists) => {
        artists.forEach(artist => {
          user.favoriteArtists.forEach(favoriteArtist => {
            if (artist._id == favoriteArtist) {
              artists.splice(0,1)
            }
          })
        });
      
        if (artists.length > 3) {
          artists.splice(3)
        }
        this.randomArtists = artists
      })  
    });



  }
}
