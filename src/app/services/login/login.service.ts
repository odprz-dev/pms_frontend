import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, UserEdit, UserLogin } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUser: User = null;
  public userSubject$ = new BehaviorSubject<User>(null);
  public user$ = this.userSubject$.asObservable();

  constructor(private baseService: BaseService) {

    this.user$.subscribe((user:User)=>{
      if(user){
        this.currentUser = user;
      } else {
        this.currentUser = {} as User;
      }
    });
  }




  login(model: UserLogin): Observable<User>{
    return this.baseService.post<User>('login/',model)
  }

  getCurrentUser(): User{
     this.user$.subscribe(result=>this.currentUser= result,err=>console.log(err),()=>{});
     return this.currentUser;
  }

  isLogedUser():boolean{
    console.log(this.currentUser)
    if(this.getCurrentUser() != null)
      return true;
    return false;
  }


  // setCurrentUser(){
  //   let usr = localStorage.getItem('usuario');
  //    if(usr!==null){

  //    }

  // }

}
