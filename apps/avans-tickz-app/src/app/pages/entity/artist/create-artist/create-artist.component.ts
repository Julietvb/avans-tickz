import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'avans-tickz-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css']
})
export class CreateArtistComponent implements OnInit {

  constructor(private artistService: ArtistService, private router: Router) { }

  ngOnInit(): void {
  }

  createArtist(artist: Artist){
    this.artistService.createArtist(artist).subscribe((returnedArtist) => 
    this.router.navigate([`/artists/${returnedArtist._id}`]));
    
  }
}
