import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venue } from '../../venue/venue.model';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';
import { Types } from 'mongoose';
import { Artist } from '../../artist/artist.model';
import { VenueService } from '../../venue/venue.service';
import { ArtistService } from '../../artist/artist.service';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'avans-tickz-create-concert',
  templateUrl: './create-concert.component.html',
  styleUrls: ['./create-concert.component.css'],
})
export class CreateConcertComponent implements OnInit {
  venues!: Venue[];
  venue!: Venue;
  venueSelected!: boolean;

  artists!: Artist[];
  artist!: Artist;
  artistSelected!: boolean;

  creatorId!: Types.ObjectId;

  constructor(
    private concertService: ConcertService,
    private authService: AuthService,
    private venueService: VenueService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.venueService
      .getAllVenues()
      .subscribe((allVenues) => (this.venues = allVenues));
    this.artistService
      .getAllArtists()
      .subscribe((allArtists) => (this.artists = allArtists));

    this.venueSelected = false;
  }

  createConcert(concert: Concert): void {
    if (this.venueSelected && this.artistSelected) {
      this.authService
        .getUserFromLocalStorage()
        .subscribe((user) => (this.creatorId = user._id));

      console.log(concert);
      concert.venue = this.venue;
      concert.artist = this.artist;
      concert.creatorId = this.creatorId;

      this.concertService.createConcert(concert).subscribe((concert) => {
        if (concert != undefined) {
          this.toastr.success(
            'You can now find and edit your concert in the overview.',
            'Concert succesfully created'
          );
        } else {
          this.toastr.error(
            'Concert was not succesfully created',
            'Something went wrong'
          );
        }
      });
      this.router.navigate(['./concerts']);
    }
  }

  setVenue(_id: Types.ObjectId) {
    this.venueService.getVenueById(_id).subscribe((venue) => {
      this.venue = venue;
      console.log(venue);
    });
    this.venueSelected = true;
  }

  setArtist(_id: Types.ObjectId) {
    this.artistService.getArtistById(_id).subscribe((artist) => {
      this.artist = artist;
      console.log(artist);
    });
    this.artistSelected = true;
  }
}
