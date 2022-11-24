import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'avans-tickz-detail-concert',
  templateUrl: './detail-concert.component.html',
  styleUrls: ['./detail-concert.component.css'],
})
export class DetailConcertComponent implements OnInit {
  concertId = Number(this.route.snapshot.paramMap.get('concertId'));
  currentConcert: Concert | undefined;
  dateFormat: string | null | undefined;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router,
    private dataPipe: DatePipe
  ) {}

  ngOnInit(): void {
    console.log('Detail page aangeroepen');

    this.concertService
      .getConcertById(this.concertId)
      .subscribe((concert) => (this.currentConcert = concert));

    if (this.currentConcert) {
      let birthDateFormat = this.dataPipe.transform(
        this.currentConcert.date,
        'dd-MM-yyyy'
      );
      this.dateFormat = birthDateFormat;
    }
  }
}
