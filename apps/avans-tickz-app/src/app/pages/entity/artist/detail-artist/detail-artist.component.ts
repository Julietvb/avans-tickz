import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import {Types} from 'mongoose';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private artistService: ArtistService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.artistService.getArtistById(this.artistId).subscribe((artist) => this.artist = artist);
  }

}
