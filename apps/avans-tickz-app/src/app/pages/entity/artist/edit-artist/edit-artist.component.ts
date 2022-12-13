import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { Types } from 'mongoose';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'avans-tickz-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css'],
})
export class EditArtistComponent implements OnInit {
  artistId!: Types.ObjectId;
  artist!: Artist;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router
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
      .subscribe((foundArtist) => (this.artist = foundArtist));
  }

  editArtist(artist: Partial<Artist>) {
    this.artistService
      .updateArtist(this.artist._id, artist)
      .subscribe((editedArtist) => {this.artist = editedArtist});
  }

  deleteArtist() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.artistService.deleteArtist(
            new Types.ObjectId(params.get('artistId')!)
          )
        )
      )
      .subscribe();

    this.router.navigate(['../artists']);
  }
}
