import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { ErrorNotificationService } from '../services/notification/error-notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: ErrorNotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err=>{
          if(err instanceof HttpErrorResponse){
            this.notificationService.emit(`${req.url} | ${err.status} - ${JSON.stringify(err.error)} ;
            }`);
          }
          return throwError(err);
        })
      );
  }

}
