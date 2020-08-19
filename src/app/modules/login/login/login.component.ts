import { Component, OnInit } from '@angular/core';
import { UserLogin, User } from 'src/app/models/user';
import { UserModule } from '../../user/user.module';
import { LoginService } from 'src/app/services/login/login.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin =  {
    usuario:'',
    password: ''
  }

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    let usr: User;
    this.loginService.user$.subscribe(result=>usr=result);
    if(usr!==null){
      this.router.navigateByUrl('usuarios')
    }
  }

  login(){

    console.log('Usuario a loguear: ', this.userLogin)
    this.loginService.login(this.userLogin).
    subscribe(result=>{
      localStorage.setItem('usuario', JSON.stringify(result));
      this.loginService.userSubject$.next(result);
      this.router.navigateByUrl('usuarios')
    }, err=>console.log({err}));

  }

  register(){
    this.router.navigateByUrl('login/register')
  }
}
