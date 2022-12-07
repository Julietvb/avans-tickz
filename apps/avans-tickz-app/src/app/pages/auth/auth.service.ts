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

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly currentUser = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {
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
          this.saveUserToLocalStorage(user);
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

  register(userData: User): Observable<User> {
    console.log(userData);
    return this.httpClient
      .post<User>(`http://localhost:3333/api/users`, userData, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          // const user = new User(response);
          console.dir(user);
          this.saveUserToLocalStorage(user);
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

  private saveUserToLocalStorage(user: User): void {
    console.log(JSON.stringify(user));
    localStorage.setItem(this.currentUser, JSON.stringify(user));
  }

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.currentUser)!);
    return of(localUser);
  }

  getProfile(): Observable<User> {
    return this.httpClient.get(
      `http://localhost:3333/api/profile`
    ) as Observable<User>;
  }

  // createUser(user: User): Observable<any> {
  //   console.log('User create aangeroepen');
  //   this.user = { ...user };
  //   this.user.userId = ++this.userId;
  //   this.userList.push(this.user);
  //   console.log(`Nieuwe user toegevoegd met ID ${this.userId}`);
  //   return of({
  //     status: 201,
  //     message: 'success',
  //   });
  // }

  // updateUser(user?: User): Observable<any> {
  //   console.log('Update User aangeroepen');
  //   return of({
  //     status: 201,
  //     message: 'success',
  //   });
  // }

  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log(error);
  //   // return an error observable with a user-facing error message
  //   return throwError(() => new Error(String(error)));
  // }
}
