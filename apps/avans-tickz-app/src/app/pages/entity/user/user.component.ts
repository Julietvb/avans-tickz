import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'avans-tickz-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy{
  subscription: Subscription | undefined;
  users: Observable<User[]> | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  ngOnInit(): void {
    this.users = this.userService.getAllUsers();
  }
}
