import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, of, Subscription, switchMap, tap } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'avans-tickz-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  subscriptionParams?: Subscription;
  user = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Edit user aangeroepen');
    // Haal de movie op voor edit
    this.subscriptionParams = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          // als we een nieuw item maken is er geen 'id'
          if (!params.get('id')) {
            // maak een lege movie
            // return of(this.movie);
            return of(this.user);
          } else {
            // haal de movie met gevraagde id via de api
            return of(this.userService.getUserById(Number(params.get('id'))));
          }
        }),
        tap(console.log)
      )
      .subscribe((user) => {
        // Spread operator om deep copy van movie te maken => op deze manier wordt
        // de movie niet geupdatet bij een "Cancel" of zonder dat een update() uitegevoerd wordt.
        this.user = { ...user };
      });
  }

  onSubmit(): void {
    console.log('onSubmit', this.user);
    // Update exiting movie
    if (this.user?.userId != 0) {
      this.userService
        .createUser(this.user)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            throw 'error in source. Details: ' + error;
            // this.alertService.error(error.message);
            // return of(false);
          })
        )
        .subscribe((success: any) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    }
    // Create a new movie
    else {
      this.userService
        .createUser(this.user)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            throw 'error in source. Details: ' + error;
            // this.alertService.error(error.message);
            // return of(false);
          })
        )
        .subscribe((success: any) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionParams?.unsubscribe();
  }
}
