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

 getAllVenues(){
    return this.httpClient.get('http://localhost:3333/api/venues') as Observable<Venue[]>;
  }

  getVenueById(_id: Types.ObjectId): Observable<Venue> {
    return this.httpClient.get(`http://localhost:3333/api/venues/${_id}`) as Observable<Venue>;
  }
  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log(error);
  //   // return an error observable with a user-facing error message
  //   return throwError(() => new Error(String(error)));
  // }
}
