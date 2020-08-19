import { Component, OnInit } from '@angular/core';
import { UserService } from './services/User/user.service';
import { User } from './models/user';
import { LoginService } from './services/login/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PmsWeb';
  currentUser: User
  isLoggedIn$: Observable<User> = this.loginService.user$;

  constructor(private loginService: LoginService){}

  isToggle = true;

  ngOnInit(): void {
    let usr = localStorage.getItem('usuario');
     if(usr!==null){
       this.loginService.userSubject$.next(JSON.parse(usr));
     }
  }

  toggleMenu(){
    this.isToggle = !this.isToggle;
  }




}
