import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _duration = 2500;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, time?: number) {
    if (time) {
      this._duration = time;
    }

    this._snackBar.open(message, "", {
      duration: this._duration,
      panelClass: 'snackbar'
    });
  }
}
