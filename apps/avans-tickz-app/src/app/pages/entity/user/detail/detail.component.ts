import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';
import { ArtistService } from '../../artist/artist.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'avans-tickz-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  // userId = new Types.ObjectId(this.route.snapshot.paramMap.get('userId')!);
  userId!: Types.ObjectId;
  currentUser!: User;
  tabSelected!: string;
  favoriteArtist!: boolean;
  loggedInUser!: User;
  followingList!: User[];
  isFollowing!: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private artistService: ArtistService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.followingList = new Array<User>()

    console.log('Detail page aangeroepen');
    this.route.params.subscribe(params => {
    this.userId = new Types.ObjectId(params['userId']);
    this.followingList.length = 0;
    
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.currentUser = user;
      this.currentUser.following.forEach(id => {
        if (id.toString().valueOf() != "") {
          this.userService.getUserById(id).subscribe((user) =>{
            this.followingList.push(user);
          })
        }
      });
      this.authService.getUserFromLocalStorage().subscribe((localUser) => {
        this.loggedInUser = localUser;
        this.isFollowing = localUser.following.includes(user._id);
      });
    });
    this.tabSelected = 'favoriteArtists'
  })
  }

  tabChange(tab: string){
    this.tabSelected = tab;
  }

  follow(user: User){
    console.log(user._id.toString())
    this.userService.follow(user._id, this.loggedInUser).subscribe((user) => {
      if (user) {
        this.authService.saveUserToLocalStorage(user)
        this.isFollowing = true;
      }
    })
  }

  unfollow(user: User){
    this.userService.unfollow(user._id, this.loggedInUser).subscribe((user) => {
      if (user) {
        this.authService.saveUserToLocalStorage(user)
        this.isFollowing = false;
      }
    })
  }
}
