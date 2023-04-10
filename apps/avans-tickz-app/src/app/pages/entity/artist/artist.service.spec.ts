import { doesNotMatch } from 'assert';
import { Observable, of } from 'rxjs';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';

describe('ArtistService', () => {
  let serviceMock: ArtistService;
  let httpClientSpy: any;
  let artistResponse: Artist[]

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
    };
    serviceMock = new ArtistService(httpClientSpy);
  });

  it('should be created', () => {
    expect(serviceMock).toBeTruthy();
  });

  it('should test getAllArtists', () => {
    const res = 'Techopsworld';
    const url = 'http://localhost:3333/api/artists';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    serviceMock.getAllArtists();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test getAllArtists', () => {
    const url = 'http://localhost:3333/api/artists';

    jest.spyOn(serviceMock, 'getAllArtists').mockReturnValue(of(artistResponse));
    
    serviceMock.getAllArtists().subscribe({
        next: (response: any) => {
            expect(response).toEqual('t')
        }
    })
    expect(serviceMock.getAllArtists).toBeCalledTimes(1);
  });
});
