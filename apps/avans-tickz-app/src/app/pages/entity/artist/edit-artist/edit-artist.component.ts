import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { Types } from 'mongoose';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'avans-tickz-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {
  artist!: Artist;
  artistId = new Types.ObjectId(this.route.snapshot.paramMap.get('artistId')!);


  constructor(private artistService: ArtistService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.artistService.getArtistById(this.artistId).subscribe((foundArtist) => this.artist = foundArtist)
  }

  editArtist(artist: Artist){
    this.artistService.updateArtist(this.artistId, artist).subscribe();
  }

  deleteArtist(){

  }
}
