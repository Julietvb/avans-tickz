import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Concert } from './concert.model';
import { HttpClient } from '@angular/common/http';
import { Types } from 'mongoose';

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  private concert?: Concert;
  public concertList: Concert[] = [
    {
      concertId: 1,
      title: 'Love On Tour',
      venueName: 'Ziggo Dome',
      venueImage:
        'https://upload.wikimedia.org/wikipedia/commons/7/74/Ziggo_Dome.JPG',
      date: new Date('12-31-2022'),
      time: '20:00',
      adres: 'De Passage 100',
      city: 'Amsterdam',
      amountOfTickets: 0,
    },
    {
      concertId: 2,
      title: 'Walls',
      venueName: 'Sportpaleis',
      venueImage:
        'https://images0.persgroep.net/rcs/Oh_zlM0wQaJSi5Uv0QOKx6rMhX4/diocontent/116624311/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8',
      date: new Date('1-30-2023'),
      time: '21:00',
      adres: 'Schijnpoortweg 119',
      city: 'Antwerpen',
      amountOfTickets: 23359,
    },
    {
      concertId: 3,
      title: 'Reputation',
      venueName: 'Poppodium 013',
      venueImage:
        'https://www.omroeptilburg.nl/wp-content/uploads/2022/02/Poppodium-013.jpg',
      date: new Date('5-23-2023'),
      time: '19:00',
      adres: 'Veemarktstraat 44',
      city: 'Tilburg',
      amountOfTickets: 3000,
    },
    {
      concertId: 4,
      title: 'The Eras Tour',
      venueName: 'Brabanthallen',
      venueImage:
        'https://bureaufranken.com/wp-content/uploads/2022/02/Bureau-Franken-BRABANTHALLEN-S-HERTOGENBOSCH1.jpg',
      date: new Date('6-10-2023'),
      time: '20:00',
      adres: 'Diezekade 2',
      city: 's-Hertogenbosch',
      amountOfTickets: 6000,
    },
    {
      concertId: 5,
      title: 'Sweetener',
      venueName: 'Melkweg',
      venueImage:
        'https://media.nu.nl/m/fmnx9weacs1e_wd1280/vijftig-jaar-melkweg-wij-zijn-er-voor-mensen-die-nergens-terechtkunnen-nuweekend-nunl.jpg',
      date: new Date('8-29-2023'),
      time: '18:00',
      adres: 'Lijnbaansgracht 234A',
      city: 'Amsterdam',
      amountOfTickets: 1250,
    },
  ];

  constructor(private httpClient: HttpClient) {}

  // getAllConcerts(): Observable<Concert[]> {
  //   console.log('User getList aangeroepen');
  //   console.log(this.concertList);
  //   return of(this.concertList);
  // }

  // getConcertById(id: number): Observable<Concert> {
  //   console.log('User getById aangeroepen');
  //   console.log(`User met ID ${id} gezocht`);
  //   const concert = this.concertList.find(
  //     (concert) => concert.concertId === id
  //   )!;
  //   return of(concert);
  // }

  getAllConcerts(): Observable<Concert[]> {
    return this.httpClient.get('http://localhost:3333/api/concerts') as Observable<Concert[]>;
  }

  getConcertById(_id: Types.ObjectId): Observable<Concert> {
    return this.httpClient.get(`http://localhost:3333/api/concerts/${_id}`) as Observable<Concert>;
  }

  deleteConcert(concertId: Types.ObjectId) {
    // this.concertList.forEach((element, index) => {
    //   if (element.concertId == concertId) this.concertList.splice(index, 1);
    // });
  }

  // createUser(user: User): Observable<any> {
  //   console.log('User create aangeroepen');
  //   this.user = { ...user };
  //   this.user.userId = ++this.userId;
  //   this.concertList.push(this.user);
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
