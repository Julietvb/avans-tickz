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

  createArtist(artist: Artist): Observable<Artist>{
    return this.httpClient.post<Artist>('http://localhost:3333/api/artists',{
      name: artist.name,
      birthDate: artist.birthDate,
      artistImage: artist.artistImage,
      artistHeader: artist.artistHeader,
      genre: artist.genre,
      description: artist.description,
      creatorId: artist.creatorId
    }) as Observable<Artist>;
  }

  updateArtist(_id: Types.ObjectId, artist: Partial<Artist>) : Observable<Artist>{
    return this.httpClient.patch<Artist>(`http://localhost:3333/api/artists/${_id}`, artist) as Observable<Artist>
  }

  deleteArtist(_id: Types.ObjectId) {
    return this.httpClient.delete(`http://localhost:3333/api/artists/${_id}`);
  }
  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log(error);
  //   // return an error observable with a user-facing error message
  //   return throwError(() => new Error(String(error)));
  // }
}
