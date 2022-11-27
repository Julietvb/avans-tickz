import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'avans-tickz-edit-concert',
  templateUrl: './edit-concert.component.html',
  styleUrls: ['./edit-concert.component.css']
})
export class EditConcertComponent implements OnInit {
  concert: Concert | undefined;
  concertId = Number(this.route.snapshot.paramMap.get('concertId'));
  
  constructor(private concertService: ConcertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.concertService.getConcertById(this.concertId).subscribe((concert) => (this.concert = concert)); 
  }

  deleteConcert(){
    this.concertService.deleteConcert(this.concertId)
    this.router.navigate(['../concerts']);
  }
}
