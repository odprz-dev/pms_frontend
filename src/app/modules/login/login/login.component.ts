import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/models/user';
import { UserModule } from '../../user/user.module';

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

  constructor() { }

  ngOnInit(): void {
  }

  login(event:any){

  }
}
