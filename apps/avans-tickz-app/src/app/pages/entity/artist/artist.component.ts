import { Types } from 'mongoose';
import { Component, OnInit } from '@angular/core';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-tickz-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artists!: Artist[]
  currentuserId!: Types.ObjectId

  constructor(private artistService: ArtistService, private authService: AuthService) { }

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe((artists) => this.artists = artists)

    this.authService.getUserFromLocalStorage().subscribe((user) => this.currentuserId = user._id)
  }

  addToFavorites(_id: Types.ObjectId){
    
  }
}
