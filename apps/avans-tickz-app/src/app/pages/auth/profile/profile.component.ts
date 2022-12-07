import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'avans-tickz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | undefined;
  dateFormat: string | null | undefined;

  constructor(private authService: AuthService, private dataPipe: DatePipe) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => this.currentUser = user)

    if(this.currentUser){
      console.log("currentUser exists")
      let birthDateFormat = this.dataPipe.transform(this.currentUser.birthDate, 'dd-MM-yyyy')
      this.dateFormat = birthDateFormat;  
    }
  }

}
