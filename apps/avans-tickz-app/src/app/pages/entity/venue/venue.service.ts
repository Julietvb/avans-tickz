import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Types } from 'mongoose';
import { Venue } from './venue.model';

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  constructor(private httpClient: HttpClient) {}

  getAllVenues(): Observable<Venue[]> {
    return this.httpClient.get('http://localhost:3333/api/venus') as Observable<Venue[]>;
  }

  getVenueById(_id: Types.ObjectId): Observable<Venue> {
    return this.httpClient.get(`http://localhost:3333/api/venues/${_id}`) as Observable<Venue>;
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
