import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user/user.model';
import { UserService } from '../../entity/user/user.service';
import { AuthService } from '../auth.service';
import { Types } from 'mongoose';
import { Ticket } from '../../entity/ticket/ticket.model';
import { ConcertService } from '../../entity/concert/concert.service';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from '../../entity/artist/artist.service';
import { Artist } from '../../entity/artist/artist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-tickz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;
  tickets!: Ticket[];
  favoriteArtists!: Artist[];
  followingUsers!: User[];
  tabSelected!: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private concertService: ConcertService,
    private toastr: ToastrService,
    private artistService: ArtistService,
    private router: Router
  ) {
    this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => (this.currentUser = user));
  }

  ngOnInit(): void {
    this.favoriteArtists = new Array<Artist>();
    this.followingUsers = new Array<User>();
    this.tickets = new Array<Ticket>();

    this.tabSelected = "favoriteArtists"

    this.userService.getUserById(this.currentUser._id).subscribe((user) => {
      this.currentUser = user;

      this.currentUser.myTickets.forEach((ticket) => {
        this.concertService
          .getConcertByName(ticket.concertName)
          .subscribe((concert) => {
            if (concert != undefined) {
              ticket.concert = concert;
            }
          });
        this.tickets = this.currentUser.myTickets;
      });

      console.log(this.currentUser.favoriteArtists);
      this.currentUser.favoriteArtists.forEach((artistId) => {
        this.artistService
          .getArtistById(artistId)
          .subscribe((favoriteArtist) => {
            this.favoriteArtists.push(favoriteArtist);
          });
      });

      this.currentUser.following.forEach((userId) => {
        this.userService.getUserById(userId).subscribe((user) => {
          this.followingUsers.push(user);
        })
      })
    });
  }

  removeFromFavorites(_id: Types.ObjectId) {
    this.userService.getUserById(this.currentUser._id).subscribe((user) => {
      this.currentUser = user;
      for (let i = 0; i < this.currentUser.favoriteArtists.length; i++) {
        if (this.currentUser.favoriteArtists[i]._id == _id) {
          this.currentUser.favoriteArtists.splice(i, 1);
        }
      }
      this.userService
        .removeFromFavoriteArtist(_id, this.currentUser)
        .subscribe((updatedUser) => {
          if (updatedUser != user) {
            this.authService.saveUserToLocalStorage(updatedUser);
            this.toastr.success(
              'Artist has been removed from your favorites',
              'Removed!'
            );      
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/profile/']));    
          } else {
            this.toastr.error(
              'Artist was not removed from your favorites',
              'Something went wrong'
            );
          }
        });
    });
  }

  tabChange(tab: string){
    this.tabSelected = tab;
  }
}
