import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ng-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <mat-dialog-content class="mat-typography">{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button (click)="onYesClick()">{{ 'confirm' | translate}}</button>
      <button mat-raised-button (click)="onNoClick()">{{ 'cancel' | translate}}</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              public translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string}) {
    this.dialogRef.disableClose = true;
  }

  onYesClick = () => this.dialogRef.close(true);
  onNoClick = () => this.dialogRef.close();

}
