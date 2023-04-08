import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistComponent } from './artist.component';
import { ArtistService } from './artist.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';
import { User } from '../user/user.model';
import { Artist } from './artist.model';
import 'fast-text-encoding';
import { Types } from 'mongoose';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;
  let artistServiceMock: jest.Mocked<ArtistService>;
  let authServiceMock: jest.Mocked<AuthService>;
  let userServiceMock: jest.Mocked<UserService>;

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
  const exampleArtists: Artist[] = [
    artist,
    {
      _id: new Types.ObjectId('63913b615640812705d69976'),
      name: 'Jane Doe',
      birthDate: new Date('1999-01-12'),
      genre: 'Classic',
      description: 'A talented musician',
      artistImage: 'https://example.com/jane-doe.jpg',
      artistHeader: 'https://example.com/jane-doe-header.jpg',
      creatorId: new Types.ObjectId(),
    },
  ];

  const exampleUser: User = {
    _id: new Types.ObjectId('6391333037ceb01d296c5982'),
    firstName: 'Jan Piet',
    lastName: 'Jansen',
    birthDate: new Date('1990-01-01'),
    emailAdres: 'janpietjansen@gmail.com',
    password: 'password123',
    favoriteArtists: [exampleArtists[0]._id, exampleArtists[1]._id],
    following: [],
    myTickets: [],
    access_token: '',
  };

  let accesToken: '' = '';
  const wrongUser = {
    _id: new Types.ObjectId(undefined),
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    emailAdres: '',
    password: '',
    favoriteArtists: [],
    following: [],
    myTickets: [],
    access_token: accesToken,
  };

  beforeEach(async () => {
    artistServiceMock = {
      getAllArtists: jest.fn().mockReturnValue(of(exampleArtists)),
    } as unknown as jest.Mocked<ArtistService>;

    authServiceMock = {
      getUserFromLocalStorage: jest.fn().mockReturnValue(of(exampleUser)),
      logout: jest.fn().mockReturnValue(undefined),
      currentUser$ : new BehaviorSubject<User | undefined>(undefined)
    } as unknown as jest.Mocked<AuthService>;

    userServiceMock = {
      getUserById: jest.fn().mockReturnValue(of(exampleUser)),
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      declarations: [ArtistComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ArtistService, useValue: artistServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllArtists on init', () => {
    component.ngOnInit();
    const result = component.artists;
    expect(result.length).toBe(2);
    expect(result[0]._id).toEqual(exampleArtists[0]._id);
    expect(result[0].name).toEqual(exampleArtists[0].name);
    expect(result[0].genre).toEqual(exampleArtists[0].genre);
    expect(result[0].birthDate).toEqual(exampleArtists[0].birthDate);
    expect(result[0].description).toEqual(exampleArtists[0].description);
    expect(result[0].artistImage).toEqual(exampleArtists[0].artistImage);
    expect(result[0].artistHeader).toEqual(exampleArtists[0].artistHeader);
    expect(result[0].creatorId).toEqual(exampleArtists[0].creatorId);

    expect(result[1]._id).toEqual(exampleArtists[1]._id);
    expect(result[1].name).toEqual(exampleArtists[1].name);
    expect(result[1].genre).toEqual(exampleArtists[1].genre);
    expect(result[1].birthDate).toEqual(exampleArtists[1].birthDate);
    expect(result[1].description).toEqual(exampleArtists[1].description);
    expect(result[1].artistImage).toEqual(exampleArtists[1].artistImage);
    expect(result[1].artistHeader).toEqual(exampleArtists[1].artistHeader);
    expect(result[1].creatorId).toEqual(exampleArtists[1].creatorId);

    expect(artistServiceMock.getAllArtists).toHaveBeenCalled();
  });

  it('should call getUserFromLocalStorage on init', () => {
    component.ngOnInit();
    expect(authServiceMock.getUserFromLocalStorage).toHaveBeenCalled();
  });

  it('should set currentUser to null if user is not authenticated', () => {
    authServiceMock.getUserFromLocalStorage.mockReturnValue(of(exampleUser));
    authServiceMock.logout.mockReturnValue(undefined);
    component.ngOnInit();

    expect(authServiceMock.currentUser$.value).toBeUndefined()
  });

  it('should set currentUser if user is authenticated', () => {
    authServiceMock.getUserFromLocalStorage.mockReturnValue(of(exampleUser));
    userServiceMock.getUserById.mockReturnValue(of(exampleUser));
    component.ngOnInit();
    expect(component.currentUser).toEqual(exampleUser);
    expect(component.currentUser._id).toEqual(exampleUser._id);
    expect(component.currentUser.firstName).toEqual(exampleUser.firstName);
    expect(component.currentUser.lastName).toEqual(exampleUser.lastName);
    expect(component.currentUser.birthDate).toEqual(exampleUser.birthDate);
    expect(component.currentUser.emailAdres).toEqual(exampleUser.emailAdres);
    expect(component.currentUser.password).toEqual(exampleUser.password);
    expect(component.currentUser.favoriteArtists).toEqual(
      exampleUser.favoriteArtists
    );
    expect(component.currentUser.following).toEqual(exampleUser.following);
    expect(component.currentUser.myTickets).toEqual(exampleUser.myTickets);
    expect(component.currentUser.access_token).toEqual(exampleUser.access_token);
  });

  it('should set userAuthenticated to true if user is authenticated', () => {
    authServiceMock.getUserFromLocalStorage.mockReturnValue(of(exampleUser));
    userServiceMock.getUserById.mockReturnValue(of(exampleUser));
    component.ngOnInit();
    expect(component.userAuthenticated).toBe(true);
    expect(component.currentUser).toEqual(exampleUser);
    expect(component.currentUser._id).toEqual(exampleUser._id);
    expect(component.currentUser.firstName).toEqual(exampleUser.firstName);
    expect(component.currentUser.lastName).toEqual(exampleUser.lastName);
    expect(component.currentUser.birthDate).toEqual(exampleUser.birthDate);
    expect(component.currentUser.emailAdres).toEqual(exampleUser.emailAdres);
    expect(component.currentUser.password).toEqual(exampleUser.password);
    expect(component.currentUser.favoriteArtists).toEqual(
      exampleUser.favoriteArtists
    );
    expect(component.currentUser.following).toEqual(exampleUser.following);
    expect(component.currentUser.myTickets).toEqual(exampleUser.myTickets);
    expect(component.currentUser.access_token).toEqual(exampleUser.access_token);
  });
});
