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

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get(`http://localhost:3333/api/users/email/${email}`) as Observable<User>;
  }

  deleteUser(_id: Types.ObjectId){
    return this.httpClient.delete(`http://localhost:3333/api/users/${_id}`)
  }

  updateUser(_id: Types.ObjectId, user: Partial<User>): Observable<User>{
    console.log(_id)
    return this.httpClient.patch(`http://localhost:3333/api/users/${_id}`, user) as Observable<User>;
  }

  follow(followUserId: Types.ObjectId, loggedInUser: User): Observable<User>{
    return this.httpClient.post<User>(`http://localhost:3333/api/users/follow/${followUserId}`, loggedInUser) as Observable<User>;  
    // return this.httpClient.patch(`http://localhost:3333/api/users/follow/${_id}`, user._id) as Observable<User>;
  }

  unfollow(unFollowUserId: Types.ObjectId, loggedInUser: User): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:3333/api/users/unfollow/${unFollowUserId}`, loggedInUser) as Observable<User>;
  }

  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log(error);
  //   // return an error observable with a user-facing error message
  //   return throwError(() => new Error(String(error)));
  // }
}
