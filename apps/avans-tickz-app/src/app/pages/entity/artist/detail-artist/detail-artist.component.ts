import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import {Types} from 'mongoose';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'avans-tickz-detail-artist',
  templateUrl: './detail-artist.component.html',
  styleUrls: ['./detail-artist.component.css']
})
export class DetailArtistComponent implements OnInit {
  artistId = new Types.ObjectId(
    this.route.snapshot.paramMap.get('artistId')!
  );
  artist!: Artist;
  currentuserId!: Types.ObjectId

  constructor(private artistService: ArtistService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.artistService.getArtistById(this.artistId).subscribe((artist) => this.artist = artist);
    this.authService.getUserFromLocalStorage().subscribe((user) => this.currentuserId = user._id)

  }

  addToFavorites(_id: Types.ObjectId){

  }
}
