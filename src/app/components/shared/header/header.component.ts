import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<User> = this.loginService.user$;

  @Output() toggleSideBarEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  toggleSideBar(event){
    this.toggleSideBarEvent.emit(event);
  }

  logout(){
    localStorage.removeItem('usuario');
    this.loginService.userSubject$.next(null);
    this.router.navigateByUrl('');
  }

}
