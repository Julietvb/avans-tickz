import { Component, OnInit } from '@angular/core';
import { Concert } from '../concert.model';

@Component({
  selector: 'avans-tickz-create-concert',
  templateUrl: './create-concert.component.html',
  styleUrls: ['./create-concert.component.css']
})
export class CreateConcertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createConcert(concert: Concert): void{

  }
}
