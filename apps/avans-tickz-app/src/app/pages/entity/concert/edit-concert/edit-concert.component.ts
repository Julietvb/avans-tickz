import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';
import { Types } from 'mongoose';
import { Venue } from '../../venue/venue.model';
import { VenueService } from '../../venue/venue.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.concertService.getConcertById(this.concertId).subscribe((concert) => {
      this.concert = concert;
      // console.log(this.concert.tickets);
    });
  }

  editConcert(concert: Partial<Concert>) {
    this.concertService
      .updateConcert(this.concertId, concert)
      .subscribe((editedConcert) => {
        if (editedConcert != undefined && this.concert != editedConcert) {
          this.toastr.success(
            'You can now find your updated concert in the overview.',
            'Concert succesfully edited'
          );
        } else {
          this.toastr.error(
            'Concert was not succesfully edited',
            'Something went wrong'
          );
        }
        this.concert = editedConcert
      });
    this.router.navigate([`/concerts/${this.concertId}`]);
  }

  deleteConcert() {
    this.concertService.deleteConcert(this.concertId).subscribe();
    this.router.navigate(['../concerts']);
  }
}
