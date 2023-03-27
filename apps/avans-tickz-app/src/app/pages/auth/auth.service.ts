import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { User } from '../entity/user/user.model';
import { Types } from 'mongoose';
import { UserService } from '../entity/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artist } from '../entity/artist/artist.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly currentUser = 'currentuser';
  public token$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly token = 'token';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + this.getUserFromLocalStorage(),
  });
  private thisUser!: User;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getUserFromLocalStorage();
    switchMap((user: User) => {
      if (user) {
        console.log('User found in local storage');
        this.currentUser$.next(user);
        return of(user);
      } else {
        console.log(`No current user found`);
        return of(undefined);
      }
    });
  }

  login(username: string, password: string) {
    console.log(username, password);
    return this.httpClient
      .post<User>(
        `http://localhost:3333/api/auth/login`,
        { username: username, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((user) => {
          this.userService
            .getUserByEmail(username)
            .subscribe((returnedUser) => {
              this.thisUser = returnedUser;
              this.saveUserToLocalStorage(this.thisUser);
            });

          this.saveTokenToLocalStorage(user);
          this.currentUser$.next(user);
          //   this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          //   this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  register(userData: User) {
    console.log(userData);
    return this.httpClient
      .post<User>(`http://localhost:3333/api/users`, userData)
      .pipe(
        map((user) => {
          // const user = new User(response);
          console.dir(user);
          this.saveUserToLocalStorage(user);
          this.thisUser = user;
          this.currentUser$.next(user);
          // this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          // this.alertService.error(error.error.message || error.message);
          return of();
        })
      );
  }

  saveUserToLocalStorage(user: User): void {
    // console.log(JSON.stringify(user));
    localStorage.setItem(this.currentUser, JSON.stringify(user));
  }

  saveTokenToLocalStorage(user: User): void {
    console.log(JSON.stringify(user));
    localStorage.setItem(this.token, JSON.stringify(user));
  }

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.currentUser)!);
    return of(localUser);
  }

  getTokenFromLocalStorage(): Observable<User> {
    const localToken = JSON.parse(localStorage.getItem(this.token)!);
    return of(localToken);
  }

  getProfile(): Observable<User> {
    return this.httpClient.get(
      `http://localhost:3333/api/profile`,
      this.getHttpOptions()
    ) as Observable<User>;
  }

  getHttpOptions(): object {
    let token;
    this.getTokenFromLocalStorage()
      .subscribe((p) => {
        token = p.access_token;
      })
      .unsubscribe();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  getReccommendations() : Observable<Artist[]>{
    return this.httpClient.get(`http://localhost:3333/api/reccommendations`, this.getHttpOptions()) as Observable<Artist[]>
  }

  logout(): void {
    localStorage.removeItem(this.currentUser);
    this.currentUser$.next(undefined);

    this.toastr.success('You have been logged out', 'Log out successful');
  }

  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log(error);
  //   // return an error observable with a user-facing error message
  //   return throwError(() => new Error(String(error)));
  // }
}
