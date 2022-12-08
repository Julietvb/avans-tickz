import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Types } from 'mongoose';
import { Artist } from './artist.model';

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private httpClient: HttpClient) {}

  getAllArtists(): Observable<Artist[]> {
    return this.httpClient.get('http://localhost:3333/api/artists') as Observable<Artist[]>;
  }

  getArtistById(_id: Types.ObjectId): Observable<Artist> {
    return this.httpClient.get(`http://localhost:3333/api/artists/${_id}`) as Observable<Artist>;
  }

  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log(error);
  //   // return an error observable with a user-facing error message
  //   return throwError(() => new Error(String(error)));
  // }
}
