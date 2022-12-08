import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

import {Types} from 'mongoose'

@Component({
  selector: 'avans-tickz-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css']
})
export class CreateArtistComponent implements OnInit {
  creatorId!: Types.ObjectId

  constructor(private artistService: ArtistService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  createArtist(artist: Artist){
    this.authService.getUserFromLocalStorage().subscribe((user) => this.creatorId = user._id);

    artist.creatorId = this.creatorId;

    this.artistService.createArtist(artist).subscribe((returnedArtist) => 
    this.router.navigate([`/artists/${returnedArtist._id}`]));
    
  }
}
