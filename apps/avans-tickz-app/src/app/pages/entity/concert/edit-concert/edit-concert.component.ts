import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';
import { Types } from 'mongoose';
import { Venue } from '../../venue/venue.model';
import { VenueService } from '../../venue/venue.service';

@Component({
  selector: 'avans-tickz-edit-concert',
  templateUrl: './edit-concert.component.html',
  styleUrls: ['./edit-concert.component.css'],
})
export class EditConcertComponent implements OnInit {
  concert!: Concert;
  concertId = new Types.ObjectId(
    this.route.snapshot.paramMap.get('concertId')!
  );
  venue!: Venue;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.concertService.getConcertById(this.concertId).subscribe((concert) => {
      this.concert = concert;
      console.log(this.concert.tickets);
    });
  }

  editConcert(concert: Partial<Concert>) {
    this.concertService
      .updateConcert(this.concertId, concert)
      .subscribe((editedConcert) => (this.concert = editedConcert));
    this.router.navigate(['/rerouteconcert']);
    this.router.navigate([`/concerts/${this.concertId}`]);
  }

  deleteConcert() {
    this.concertService.deleteConcert(this.concertId).subscribe();
    this.router.navigate(['../concerts']);
  }
}
