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
  public userList: User[] = [
    {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date('12-20-2000'),
      emailAdres: 'johndoe@gmail.com',
      password: 'password',
    },
    {
      userId: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      birthDate: new Date('3-6-2012'),
      emailAdres: 'janedoe@gmail.com',
      password: 'password',
    },
    {
      userId: 3,
      firstName: 'Jan',
      lastName: 'Jansen',
      birthDate: new Date('11-12-2013'),
      emailAdres: 'janjansen@gmail.com',
      password: 'password',
    },
    {
      userId: 4,
      firstName: 'Daniël',
      lastName: 'van Zuijdam',
      birthDate: new Date('6-10-2004'),
      emailAdres: 'dca.vanzuijdam@student.avans.nl',
      password: 'password',
    },
    {
      userId: 5,
      firstName: 'Juliet',
      lastName: 'van Bezooijen',
      birthDate: new Date('8-29-2003'),
      emailAdres: 'jay.vanbezooijen@student.avans.nl',
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

  getUserById(id: number): Observable<User> {
    console.log('User getById aangeroepen');
    console.log(`User met ID ${id} gezocht`);
    const user = this.userList.find(user => user.userId === id)!;
    return of(user);
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
