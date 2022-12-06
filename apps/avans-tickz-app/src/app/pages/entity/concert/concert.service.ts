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
  ];

  constructor(private httpClient: HttpClient) {}
  
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

  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log(error);
  //   // return an error observable with a user-facing error message
  //   return throwError(() => new Error(String(error)));
  // }
}
