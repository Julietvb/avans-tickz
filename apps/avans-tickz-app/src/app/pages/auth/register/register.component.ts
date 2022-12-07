import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../entity/user/user.model';
import { UserService } from '../../entity/user/user.service';

@Component({
  selector: 'avans-tickz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(user: User): void{
    this.userService.userList.push(user);
    this.router.navigate(['./users']);
  }

}
