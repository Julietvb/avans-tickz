import { Component, OnInit } from '@angular/core';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';

@Component({
  selector: 'avans-tickz-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artists!: Artist[]

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe((artists) => this.artists = artists)
  }

}
