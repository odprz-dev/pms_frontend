import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { User, UserEdit } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private baseService: BaseService) { }

  getUsers(): Observable<User[]>{
    return this.baseService.get<User[]>('app/Users/');
  }

  getUserById(id: string): Observable<User>{
    return this.baseService.get<User>('app/Users/'+id);
  }

  postUser(model: User): Observable<User>{
    return this.baseService.post<User>('app/Users/',model);
  }

  putUser(id: string,  model: UserEdit):Observable<User>{
    return this.baseService.put<User>('app/Users/'+ id, model);
  }


  deleteUser(id: string):Observable<User>{
    return this.baseService.delete<User>('app/Users/'+ id);
  }
}
