import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/User/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  breakPoint: number;
  wasFormChanged = false;




  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.breakPoint = window.innerWidth <=600 ? 1 : 1;

    this.userForm = this.fb.group({
      PkIdUser:[],
      UserName: [, [Validators.required, Validators.minLength(7)]],
      Email: [, [Validators.required, Validators.email]],
      CtStatus: [true],
      FkIdSexo: [1],
      Password: ['',[Validators.minLength(10), Validators.pattern("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{5,}$")]],
      ConfirmPassword: ['',[Validators.minLength(10), Validators.pattern("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{5,}$")]]

    });

  }

  public onResize(event){
    this.breakPoint = event.target.innerWidth <=600 ? 1:1;
  }

  saveUser(){
    this.userService.postUser(this.userForm.value)
      .subscribe(result=>{
        localStorage.setItem('usuario', JSON.stringify(result));
        this.loginService.userSubject$.next(result);
        this.router.navigateByUrl('usuarios')
        this.notificationService.emitSuccess();
      }, err =>{
        console.log('error: ',err);
        this.notificationService.showError(err);
      });
  }

  formChanged( ){
    this.wasFormChanged = true;
  }

  cancel(){
    this.router.navigateByUrl('login')
  }


}
