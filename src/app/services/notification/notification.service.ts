import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationBase } from 'src/app/models/notification';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  showNotificacionSource: Subject<any> = new Subject();

  getNotificacion(): Observable<any> {
    return this.showNotificacionSource.asObservable();
  }

  showError(msg: string, summary?: string) {
    this.show('error', summary, msg);
  }

  showSuccess(msg: string, summary?: string) {
    this.show('success', summary, msg);
  }

  showInfo(msg: string, summary?: string) {
    this.show('info', summary, msg);
  }

  showWarn(msg: string, summary?: string) {
    this.show('warn', summary, msg);
  }

  private show(severity: string, summary: string, msg: string) {
    const notificacion: NotificationBase = {
      summary: summary,
      severity: severity,
      detail: msg
    };

    this.notify(notificacion);

  }

  emitSuccess(){
    this.snackbar.open('Operación satisfactoria', 'OK', {duration: 30000, panelClass: 'success-snackbar'});
  }

  private notify(notificacion: NotificationBase): void {
    this.showNotificacionSource.next(notificacion);
  }


}
