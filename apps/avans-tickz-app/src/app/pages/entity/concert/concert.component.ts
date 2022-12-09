import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Venue } from '../venue/venue.model';
import { VenueService } from '../venue/venue.service';
import { Concert } from './concert.model';
import { ConcertService } from './concert.service';
import { Types } from 'mongoose';
import { AuthService } from '../../auth/auth.service';
import { User } from '../user/user.model';
@Component({
  selector: 'avans-tickz-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css'],
})
export class ConcertComponent implements OnInit {
  concerts: Concert[] | undefined;
  currentUser!: User;
  userAuthenticated!: boolean;

  constructor(
    private concertService: ConcertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.concertService.getAllConcerts().subscribe((concerts) => {
      this.concerts = concerts;
    });

    this.authService.getUserFromLocalStorage().subscribe((user) => {
      this.currentUser = user;
      if (user == undefined) {
        this.userAuthenticated = false;
      } else {
        this.userAuthenticated = true;
      }
    });
  }
}
