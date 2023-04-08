import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, Router, convertToParamMap } from '@angular/router';
import { ArtistService } from '../artist.service';
import 'fast-text-encoding';
import { EditArtistComponent } from './edit-artist.component';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';
import { Artist } from '../artist.model';
import { Types } from 'mongoose';
import { FormsModule, NgForm } from '@angular/forms';


describe('EditArtistComponent', () => {
  let component: EditArtistComponent;
  let fixture: ComponentFixture<EditArtistComponent>;
  let artistServiceMock: jest.Mocked<ArtistService>;
  let routeMock: jest.Mocked<ActivatedRoute>;
  let routerMock: jest.Mocked<Router>;
  let toastrServiceMock: jest.Mocked<ToastrService>;

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
  const updatedArtist: Artist = {
    _id: new Types.ObjectId('6391333037ceb01d296c5982'),
    name: 'Test Test',
    birthDate: new Date('1990-01-01'),
    genre: 'Rock',
    description: 'A talented musician',
    artistImage: 'https://example.com/john-doe.jpg',
    artistHeader: 'https://example.com/john-doe-header.jpg',
    creatorId: new Types.ObjectId(),
  };

  beforeEach(() => {
    artistServiceMock = {
      getArtistById: jest.fn().mockReturnValue(of(artist)),
      updateArtist: jest.fn().mockReturnValue(of(updatedArtist)),
      deleteArtist: jest.fn(),
    } as unknown as jest.Mocked<ArtistService>;

    routeMock = {
      paramMap: of(convertToParamMap({ artistId: artist._id })),
      params: of({ artistId: artist._id }),
    } as unknown as jest.Mocked<ActivatedRoute>;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditArtistComponent],
      imports: [FormsModule],
      providers: [
        { provide: ArtistService, useValue: artistServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('get Artist', () => {
      expect(artistServiceMock.getArtistById).toHaveBeenCalledWith(artist._id);
      expect(component.artist).toEqual(artist);
    });
  });

  describe('editArtist', () => {
    it('should update the artist, navigate to detail page', () => {
      component.editArtist(updatedArtist);

      expect(artistServiceMock.updateArtist).toHaveBeenCalledWith(
        artist._id,
        updatedArtist
      );

      const result = component.artist
      expect(result._id).toEqual(updatedArtist._id);
      expect(result.name).toEqual(updatedArtist.name);
      expect(result.genre).toEqual(updatedArtist.genre);
      expect(result.birthDate).toEqual(updatedArtist.birthDate);
      expect(result.description).toEqual(updatedArtist.description);
      expect(result.artistImage).toEqual(updatedArtist.artistImage);
      expect(result.artistHeader).toEqual(updatedArtist.artistHeader);
      expect(result.creatorId).toEqual(updatedArtist.creatorId);
  
      expect(routerMock.navigate).toHaveBeenCalledWith([
        `../artists/${artist._id}`,
      ]);
    });
  });

  describe('deleteArtist', () => {
    it('should call deleteArtist with the artistId', () => {
      component.deleteArtist();

      expect(artistServiceMock.deleteArtist).toHaveBeenCalledWith(artist._id);

      expect(routerMock.navigate).toHaveBeenCalledWith(['../artists']);

    });
  });
});
