import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { Types } from 'mongoose';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'avans-tickz-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css'],
})
export class EditArtistComponent implements OnInit {
  artistId!: Types.ObjectId;
  artist!: Artist;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.artistService.getArtistById(
            new Types.ObjectId(params.get('artistId')!)
          )
        )
      )
      .subscribe((foundArtist) => (this.artist = foundArtist));
  }

  editArtist(artist: Partial<Artist>) {
    this.artistService
      .updateArtist(this.artist._id, artist)
      .subscribe((editedArtist) => {
        this.artist = editedArtist;
        this.router.navigate([`../artists/${editedArtist._id}`]);
        if (editedArtist != undefined) {
          this.toastr.success(
            'You can find your updated artist in the overview.',
            'Artist succesfully edited'
          );
        } else {
          this.toastr.error(
            'Artist was not succesfully updated',
            'Something went wrong'
          );
        }
      });
  }

  deleteArtist() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.artistService.deleteArtist(
            new Types.ObjectId(params.get('artistId')!)
          )
        )
      )
      .subscribe(() => {
        this.route.paramMap
          .pipe(
            switchMap((params: ParamMap) =>
              this.artistService.getArtistById(
                new Types.ObjectId(params.get('artistId')!)
              )
            )
          )
          .subscribe((foundArtist) => {
            if (foundArtist == undefined) {
              this.toastr.success(
                'You artist has been succesfully deleted',
                'Artist succesfully deleted'
              );
            } else {
              this.toastr.error(
                'Artist was not succesfully deleted',
                'Something went wrong'
              );
            }
          });
      });

    this.router.navigate(['../artists']);
  }
}
