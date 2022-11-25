import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'avans-tickz-create-concert',
  templateUrl: './create-concert.component.html',
  styleUrls: ['./create-concert.component.css']
})
export class CreateConcertComponent implements OnInit {

  constructor(private concertService: ConcertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  createConcert(concert: Concert): void{
    this.concertService.concertList.push(concert);
    this.router.navigate(['./concerts']);
  }
}
