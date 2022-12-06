import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Venue } from '../venue/venue.model';
import { VenueService } from '../venue/venue.service';
import { Concert } from './concert.model';
import { ConcertService } from './concert.service';
import { Types } from 'mongoose'
@Component({
  selector: 'avans-tickz-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css'],
})
export class ConcertComponent implements OnInit {
  concerts: Concert[] | undefined;
  venueId!: Types.ObjectId;
  venue: Venue | undefined;

  constructor(
    private concertService: ConcertService,
    private venueService: VenueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.concertService.getAllConcerts().subscribe((concerts) => { this.concerts = concerts;
    })
  }
}
