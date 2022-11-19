import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'avans-tickz-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  userId: Number = 0;
  currentUser: User | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    console.log('Detail page aangeroepen')
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('userId'));
    })
    this.currentUser = this.userService.getUserById(Number(this.userId));
  }

}
