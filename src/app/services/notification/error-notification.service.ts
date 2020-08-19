import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ErrorNotificationService {

  constructor(private snackbar: MatSnackBar) { }

  emit(notification){
    this.snackbar.open(notification, 'OK', {duration: 30000});
  }
}
