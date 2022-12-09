import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';
import { Types } from 'mongoose';
import { VenueService } from '../../venue/venue.service';
import { Venue } from '../../venue/venue.model';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../user/user.model';

@Component({
  selector: 'avans-tickz-detail-concert',
  templateUrl: './detail-concert.component.html',
  styleUrls: ['./detail-concert.component.css'],
})
export class DetailConcertComponent implements OnInit {
  concertId = new Types.ObjectId(
    this.route.snapshot.paramMap.get('concertId')!
  );
  currentConcert: Concert | undefined;
  venue: Venue | undefined;
  userAuthenticated!: boolean;
  currentUser!: User;

  constructor(
    private concertService: ConcertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Detail page aangeroepen');

    this.concertService.getConcertById(this.concertId).subscribe((concert) => 
      this.currentConcert = concert
    );

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
