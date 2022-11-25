import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'avans-tickz-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  user: User | undefined;
  userId = Number(this.route.snapshot.paramMap.get('userId'));
  
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log('Edit user aangeroepen');

    this.userService.getUserById(this.userId).subscribe((user) => (this.user = user)); 
  }

  deleteUser(): void{
    this.userService.deleteUser(this.userId)
    this.location.back();
  }
}
