import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';
import { Types } from 'mongoose';

@Component({
  selector: 'avans-tickz-detail-concert',
  templateUrl: './detail-concert.component.html',
  styleUrls: ['./detail-concert.component.css'],
})
export class DetailConcertComponent implements OnInit {
  concertId = new Types.ObjectId(this.route.snapshot.paramMap.get('concertId')!);
  currentConcert: Concert | undefined;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log('Detail page aangeroepen');

    this.concertService
      .getConcertById(this.concertId)
      .subscribe((concert) => (this.currentConcert = concert));

  }
}
