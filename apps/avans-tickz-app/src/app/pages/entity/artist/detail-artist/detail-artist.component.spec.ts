import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import 'fast-text-encoding';
import { Types } from 'mongoose';

import { DetailArtistComponent } from './detail-artist.component';
import { Artist } from '../artist.model';
import { User } from '../../user/user.model';
import { ArtistService } from '../artist.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('DetailArtistComponent', () => {
  let component: DetailArtistComponent;
  let fixture: ComponentFixture<DetailArtistComponent>;
  let artistServiceMock: jest.Mocked<ArtistService>;
  let userServiceMock: jest.Mocked<UserService>;
  let authServiceMock: jest.Mocked<AuthService>;
  let activatedRouteMock: any;
  let routerMock: any;
  let toastrServiceMock: any;

  const artist: Artist = {
    _id: new Types.ObjectId('6391333037ceb01d296c5982'),
    name: 'John Doe',
    birthDate: new Date('1990-01-01'),
    genre: 'Rock',
    description: 'A talented musician',
    artistImage: 'https://example.com/john-doe.jpg',
    artistHeader: 'https://example.com/john-doe-header.jpg',
    creatorId: new Types.ObjectId(),
  };

  const artist2: Artist = {
    _id: new Types.ObjectId('63913b615640812705d69976'),
    name: 'Jane Doe',
    birthDate: new Date('1999-01-12'),
    genre: 'Classic',
    description: 'A talented musician',
    artistImage: 'https://example.com/jane-doe.jpg',
    artistHeader: 'https://example.com/jane-doe-header.jpg',
    creatorId: new Types.ObjectId(),
  };

  const relatedArtist: Artist = {
    _id: new Types.ObjectId(),
    name: 'Jake Doe',
    birthDate: new Date('1970-01-10'),
    genre: 'Rock',
    description: 'A talented musician',
    artistImage: 'https://example.com/jake-doe.jpg',
    artistHeader: 'https://example.com/jake-doe-header.jpg',
    creatorId: new Types.ObjectId(),
  };
  const exampleArtists: Artist[] = [artist, artist2, relatedArtist];

  const exampleUser: User = {
    _id: new Types.ObjectId('6391333037ceb01d296c5982'),
    firstName: 'Jan Piet',
    lastName: 'Jansen',
    birthDate: new Date('1990-01-01'),
    emailAdres: 'janpietjansen@gmail.com',
    password: 'password123',
    favoriteArtists: [],
    following: [],
    myTickets: [],
    access_token: '',
  };

  const exampleUserUpdated: User = {
    _id: new Types.ObjectId('6391333037ceb01d296c5982'),
    firstName: 'Jan Piet',
    lastName: 'Jansen',
    birthDate: new Date('1990-01-01'),
    emailAdres: 'janpietjansen@gmail.com',
    password: 'password123',
    favoriteArtists: [artist._id],
    following: [],
    myTickets: [],
    access_token: '',
  };

  beforeEach(async () => {
    artistServiceMock = {
      getAllArtists: jest.fn().mockReturnValue(of(exampleArtists)),
      getArtistById: jest.fn().mockReturnValue(of(artist)),
    } as unknown as jest.Mocked<ArtistService>;

    authServiceMock = {
      getUserFromLocalStorage: jest.fn().mockReturnValue(of(exampleUser)),
      saveUserToLocalStorage: jest.fn().mockReturnValue(of(exampleUserUpdated)),
      currentUser$: new BehaviorSubject<User | undefined>(undefined),
    } as unknown as jest.Mocked<AuthService>;

    userServiceMock = {
      getUserById: jest.fn().mockReturnValue(of(exampleUser)),
      addToFavoriteArtist: jest.fn().mockReturnValue(of(exampleUserUpdated)),
      removeFromFavoriteArtist: jest.fn().mockReturnValue(of(exampleUser)),
    } as unknown as jest.Mocked<UserService>;

    activatedRouteMock = {
      paramMap: of(convertToParamMap({ artistId: artist._id })),
      params: of({ artistId: artist._id }),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DetailArtistComponent],
      providers: [
        { provide: ArtistService, useValue: artistServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Get artist', () => {
    it('Should call getArtistById', (done) => {
      component.ngOnInit();

      expect(artistServiceMock.getArtistById).toHaveBeenCalledWith(artist._id);

      expect(component.artistId).toEqual(artist._id);
      expect(component.artist).toEqual(artist);

      expect(component.artist._id).toEqual(artist._id);
      expect(component.artist.name).toEqual(artist.name);
      expect(component.artist.genre).toEqual(artist.genre);
      expect(component.artist.birthDate).toEqual(artist.birthDate);
      expect(component.artist.description).toEqual(artist.description);
      expect(component.artist.artistImage).toEqual(artist.artistImage);
      expect(component.artist.artistHeader).toEqual(artist.artistHeader);
      expect(component.artist.creatorId).toEqual(artist.creatorId);

      expect(artistServiceMock.getArtistById).toBeCalled();
      expect(artistServiceMock.getArtistById).toBeTruthy();
      done();
    });
  });
  
  describe('Set related artists', () => {
    it('should set the related artists based on the genre', () => {
      expect(artistServiceMock.getAllArtists).toBeCalled();
      expect(component.relatedArtists).toEqual([relatedArtist]);
      expect(component.relatedArtists[0]._id).toEqual(relatedArtist._id);
      expect(component.relatedArtists[0].name).toEqual(relatedArtist.name);
      expect(component.relatedArtists[0].genre).toEqual(relatedArtist.genre);
      expect(component.relatedArtists[0].birthDate).toEqual(
        relatedArtist.birthDate
      );
      expect(component.relatedArtists[0].description).toEqual(
        relatedArtist.description
      );
      expect(component.relatedArtists[0].artistImage).toEqual(
        relatedArtist.artistImage
      );
      expect(component.relatedArtists[0].artistHeader).toEqual(
        relatedArtist.artistHeader
      );
      expect(component.relatedArtists[0].creatorId).toEqual(
        relatedArtist.creatorId
      );
    });
  });

  describe('Add to favorites', () => {
    it('should add artist to favorites', () => {
      component.favoriteArtist = false;
      component.ngOnInit();
      component.addToFavorites(artist._id);

      expect(userServiceMock.getUserById).toHaveBeenCalledWith(exampleUser._id);
      expect(artistServiceMock.getArtistById).toHaveBeenCalledWith(artist._id);
      expect(userServiceMock.addToFavoriteArtist).toHaveBeenCalledWith(
        artist._id,
        exampleUser
      );

      expect(authServiceMock.saveUserToLocalStorage).toHaveBeenCalledWith(
        exampleUserUpdated
      );

      expect(routerMock.navigate).toHaveBeenCalledWith(['/profile']);
    });
  });

  describe('Remove from favorites', () => {
    it('should remove artist from favorites', () => {
      component.addToFavorites(artist._id);
      component.favoriteArtist = true;
      component.removeFromFavorites(artist._id);

      expect(userServiceMock.getUserById).toHaveBeenCalledWith(
        exampleUserUpdated._id
      );
      expect(artistServiceMock.getArtistById).toHaveBeenCalledWith(artist._id);

      expect(userServiceMock.removeFromFavoriteArtist).toHaveBeenCalledWith(
        artist._id,
        exampleUser
      );

      expect(authServiceMock.saveUserToLocalStorage).toHaveBeenCalledWith(
        exampleUserUpdated
      );

      expect(routerMock.navigate).toHaveBeenCalledWith(['/profile']);
    });
  });
});
