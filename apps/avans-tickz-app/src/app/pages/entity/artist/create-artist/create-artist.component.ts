import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

import { Types } from 'mongoose';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'avans-tickz-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css'],
})
export class CreateArtistComponent implements OnInit {
  creatorId!: Types.ObjectId;

  constructor(
    private artistService: ArtistService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  createArtist(artist: Artist) {
    this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => (this.creatorId = user._id));

    artist.creatorId = this.creatorId;

    this.artistService.createArtist(artist).subscribe((artist) => {
      this.router.navigate([`reroute`]);
      this.router.navigate([`/artists`]);
    });
    if (artist != undefined) {
      this.toastr.success(
        'You can now find and edit your artist in the overview.',
        'Artist succesfully created'
      );
    } else {
      this.toastr.error(
        'Artist was not succesfully created',
        'Something went wrong'
      );
    }
  }
}
