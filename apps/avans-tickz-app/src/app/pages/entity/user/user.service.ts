import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user?: User;
  private userList: User[] = [
    {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date(20-12-2000),
      emailAdres: 'johndoe@gmail.com',
      password: 'password',
    },
    {
      userId: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      birthDate: new Date(3-6-2012),
      emailAdres: 'janedoe@gmail.com',
      password: 'password',
    },
    {
      userId: 3,
      firstName: 'Jan',
      lastName: 'Jansen',
      birthDate: new Date(11-12-2013),
      emailAdres: 'janjansen@gmail.com',
      password: 'password',
    },
  ];

  userId: number = this.userList.length;

  constructor() {}

  getAllUsers(): Observable<User[]> {
    console.log('User getList aangeroepen');
    console.log(this.userList);
    return of(this.userList);
  }

  getUserById(id: number): User {
    console.log('User getById aangeroepen');
    console.log(`User met ID ${id} gezocht`);
    return (this.userList.filter((item) => item.userId === id)[0]);
  }

  createUser(user: User): Observable<any> {
    console.log('User create aangeroepen');
    this.user = { ...user };
    this.user.userId = ++this.userId;
    this.userList.push(this.user);
    console.log(`Nieuwe user toegevoegd met ID ${this.userId}`);
    return of({
      status: 201,
      message: 'success',
    });
  }

  updateUser(user?: User): Observable<any> {
    console.log('Update User aangeroepen');
    return of({
      status: 201,
      message: 'success',
    });
  }

  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log(error);
  //   // return an error observable with a user-facing error message
  //   return throwError(() => new Error(String(error)));
  // }
}
