import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'avans-tickz-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  userId = Number(this.route.snapshot.paramMap.get('userId'));
  currentUser: User | undefined;
  dateFormat: string | null | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private dataPipe: DatePipe) { }



  ngOnInit(): void {
    console.log('Detail page aangeroepen')

    // this.currentUser = this.userService.getUserById(Number(this.userId));
    this.userService.getUserById(this.userId).subscribe((user) => (this.currentUser = user));

    if(this.currentUser){
      let birthDateFormat = this.dataPipe.transform(this.currentUser.birthDate, 'dd-MM-yyyy')
      this.dateFormat = birthDateFormat;  
    }
  }
}
