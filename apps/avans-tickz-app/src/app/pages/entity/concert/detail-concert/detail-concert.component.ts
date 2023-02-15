import { DatePipe } from '@angular/common';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';
import { Types } from 'mongoose';
import { VenueService } from '../../venue/venue.service';
import { Venue } from '../../venue/venue.model';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../user/user.model';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'avans-tickz-detail-concert',
  templateUrl: './detail-concert.component.html',
  styleUrls: ['./detail-concert.component.css'],
})
export class DetailConcertComponent implements OnInit {
  currentConcert!: Concert;
  venue: Venue | undefined;
  userAuthenticated!: boolean;
  currentUser!: User;
  returnedConcert!: Concert;

  constructor(
    private concertService: ConcertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Detail page aangeroepen');

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.concertService.getConcertById(new Types.ObjectId(params.get('concertId')!))
    )).subscribe((concert) =>
      this.currentConcert = concert
    )

    this.authService.getUserFromLocalStorage().subscribe((user) => {
      this.currentUser = user;
      if (user == undefined) {
        this.userAuthenticated = false;
      } else {
        this.userAuthenticated = true;
      }
    });
  }

  buyTickets(){
    console.log(this.currentConcert._id)
    console.log(ticket);

    console.log('Original length: ' + this.currentConcert.tickets.length)
    console.log('Original amount: ' + this.currentConcert.amountOfTickets)

    var updatedConcert = this.currentConcert;
    var updatedUser = this.currentUser;

    var ticket = updatedConcert.tickets.pop();
    updatedConcert.amountOfTickets =  updatedConcert.amountOfTickets.valueOf() - 1;

    console.log('Updated length: ' + updatedConcert.tickets.length)
    console.log('Updated amount: ' + updatedConcert.amountOfTickets)
    

    if(ticket != null){
      updatedUser.myTickets.push(ticket);
      console.log(updatedUser.myTickets)
    }

    // this.authService.

    this.concertService
    .updateConcert(updatedConcert._id, updatedConcert)
    .subscribe((editedConcert) => {this.returnedConcert = editedConcert;
    console.log(this.returnedConcert)});


  }
}
