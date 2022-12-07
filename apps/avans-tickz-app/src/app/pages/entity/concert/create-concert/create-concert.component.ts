import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venue } from '../../venue/venue.model';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';
import {Types} from 'mongoose';

@Component({
  selector: 'avans-tickz-create-concert',
  templateUrl: './create-concert.component.html',
  styleUrls: ['./create-concert.component.css']
})
export class CreateConcertComponent implements OnInit {
  venues!: Venue[];
  venue!: Venue;
  venueSelected!: boolean;

  constructor(private concertService: ConcertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.concertService.getAllVenues().subscribe((allVenues) => this.venues = allVenues);
    this.venueSelected = false;
  }

  createConcert(concert: Concert): void{
    if (this.venueSelected) {
      console.log(concert)
      concert.venue = this.venue;
      this.concertService.createConcert(concert).subscribe();
      this.router.navigate(['./concerts']);
    }
  }

  setVenue(_id: Types.ObjectId){
    this.concertService.getVenueById(_id).subscribe((venue) => {this.venue = venue
      console.log(venue)})
      this.venueSelected = true;
  }
}
