import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoadingComponent } from '../../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private _dialog: MatDialog,) { }

  openLoadingScreen(): MatDialogRef<LoadingComponent> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '300px';
    dialogConfig.panelClass = 'loading';

    return this._dialog.open(LoadingComponent, dialogConfig);
  }
}
