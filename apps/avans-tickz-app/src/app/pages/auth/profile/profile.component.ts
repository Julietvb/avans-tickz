import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user/user.model';
import { UserService } from '../../entity/user/user.service';
import { AuthService } from '../auth.service';
import { Types } from 'mongoose'
import { Ticket } from '../../entity/ticket/ticket.model';
import { ConcertService } from '../../entity/concert/concert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'avans-tickz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;
  tickets!: Ticket[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private concertService: ConcertService,
    private toastr: ToastrService
  ) {
    this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => (this.currentUser = user));
  }

  ngOnInit(): void {
    this.userService.getUserById(this.currentUser._id).subscribe((user) => {
      this.currentUser = user;

      this.currentUser.myTickets.forEach(ticket => {
        this.concertService.getConcertByName(ticket.concertName).subscribe((concert) => {
        ticket.concert = concert})
        this.tickets = this.currentUser.myTickets
      });

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
        .updateUser(this.currentUser._id, this.currentUser)
        .subscribe((updatedUser) =>{
          if (updatedUser != user) {
            this.toastr.success(
              'Artist has been removed from your favorites',
              'Removed'
            );
          } else {
            this.toastr.error(
              'Something went wrong',
              'Artist was not removed from your favorites'
            );
          }
          this.authService.saveUserToLocalStorage(updatedUser)}
        );
    });
  }
}
