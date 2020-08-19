import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private loginservice: LoginService) { }


  currentUser: User;

  ngOnInit(): void {

    this.currentUser = this.loginservice.getCurrentUser();


  }

}
