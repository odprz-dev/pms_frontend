import { Component, OnInit } from '@angular/core';
import { UserService } from './services/User/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PmsWeb';
  users: User[] = []

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      result=> this.users = result,
      err=>console.log({err}),
      ()=>{}
    )
  }


}
