import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from './concert.model';
import { ConcertService } from './concert.service';

@Component({
  selector: 'avans-tickz-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css'],
})
export class ConcertComponent implements OnInit {
  concerts: Concert[] | undefined;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.concerts = this.concertService.concertList;
  }
}
