import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';

@Component({
  selector: 'avans-tickz-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  userId = new Types.ObjectId(this.route.snapshot.paramMap.get('userId')!);
  currentUser: User | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    console.log('Detail page aangeroepen');
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.currentUser = user;
    });
  }
}
