import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Venue } from '../venue/venue.model';
import { VenueService } from '../venue/venue.service';
import { Concert } from './concert.model';
import { ConcertService } from './concert.service';
import { Types } from 'mongoose'
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'avans-tickz-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css'],
})
export class ConcertComponent implements OnInit {
  concerts: Concert[] | undefined;
  currentuserId!: Types.ObjectId

  constructor(
    private concertService: ConcertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.concertService.getAllConcerts().subscribe((concerts) => { this.concerts = concerts;
    })

    this.authService.getUserFromLocalStorage().subscribe((user) => this.currentuserId = user._id)
  }
}
