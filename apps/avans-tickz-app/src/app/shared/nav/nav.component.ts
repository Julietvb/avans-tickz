import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';
import { User } from '../../pages/entity/user/user.model';

@Component({
  selector: 'avans-tickz-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  currentUser!: User;
  userAuthenticated!: boolean;
  loggedInUser$!: Observable<User | undefined> 

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$
  }

  logout(): void {
    this.authService.logout()
  }
}
