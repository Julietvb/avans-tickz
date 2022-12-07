import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Concert } from './concert.model';
import { HttpClient } from '@angular/common/http';
import { Types } from 'mongoose';
import { Venue } from '../venue/venue.model';

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

  createConcert(concert: Concert): Observable<Concert>{
    console.log("createConcert aangeroepen")
    console.log("createConcert" + concert)
    return this.httpClient.post<Concert>('http://localhost:3333/api/concerts',{
      title: concert.title,
      date: concert.date,
      time: concert.time,
      amountOfTickets: concert.amountOfTickets,
      performances: [],
      artists: concert.artists,
      performTimes: concert.performTimes,
      tickets: [],
      ticketPrice: concert.ticketPrice,
      ticketType: concert.ticketType,
      venue: concert.venue
    }) as Observable<Concert>;
  }

  updateConcert(_id: Types.ObjectId, concert: Partial<Concert>){
    return this.httpClient.patch<Concert>(`http://localhost:3333/api/concerts/${_id}`, concert)
  }

  deleteConcert(_id: Types.ObjectId) {
    return this.httpClient.delete(`http://localhost:3333/api/concerts/${_id}`);
  }

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
