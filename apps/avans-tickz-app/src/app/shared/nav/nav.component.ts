import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';
import { User } from '../../pages/entity/user/user.model';

@Component({
  selector: 'avans-tickz-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  currentUser: User | undefined;
  userAuthenticated!: boolean;
  userSubscription!: Subscription;
  localUserSubscription!: Subscription;
  loggedInUser$!: Observable<User | undefined> 

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
    this.localUserSubscription = this.authService
    .getUserFromLocalStorage()
    .subscribe((user) => (this.currentUser = user));
  }

  logout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/users', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/']));
  }
}
