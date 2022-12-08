import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { User } from './user.model';
import { Types } from 'mongoose';

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})

export class UserService {
  // private user?: User;

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get('http://localhost:3333/api/users') as Observable<User[]>;
  }

  getUserById(_id: Types.ObjectId): Observable<User> {
    return this.httpClient.get(`http://localhost:3333/api/users/${_id}`) as Observable<User>;
  }

  deleteUser(_id: Types.ObjectId){
    return this.httpClient.delete(`http://localhost:3333/api/users/${_id}`)
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
