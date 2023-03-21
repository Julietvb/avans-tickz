import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../entity/user/user.model';

@Component({
  selector: 'avans-tickz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined> 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.getUserFromLocalStorage()
  }

}
