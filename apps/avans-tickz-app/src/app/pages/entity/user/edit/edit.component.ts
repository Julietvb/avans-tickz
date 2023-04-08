import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Types } from 'mongoose';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'avans-tickz-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  user!: User;
  userId = new Types.ObjectId(this.route.snapshot.paramMap.get('userId')!);

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('Edit user aangeroepen');

    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  deleteUser(): void {
    this.userService.deleteUser(this.userId).subscribe();
    this.router.navigate(['/']);
  }

  editUser(user: User): void {
    this.userService.updateUser(this.userId, user).subscribe((updatedUser) => {
      this.user = updatedUser;
      this.authService.saveUserToLocalStorage(updatedUser);
    });
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/profile']));
  }
}
