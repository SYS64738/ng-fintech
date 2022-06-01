import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {Card} from "../../models/card";

@Component({
  selector: 'ng-select-card-dialog',
  template: `
    <h1 mat-dialog-title>{{ 'tax.selectCard' | translate }}</h1>
    <mat-form-field class="mat-input-large" appearance="fill">
      <mat-label>{{ 'transfer.chooseCard' | translate }}</mat-label>
      <mat-select>
        <mat-option
          *ngFor="let card of (data.cards$ | async) ?? []"
          [value]="card._id"
          (onSelectionChange)="selectedCard = card._id"
        >
          {{ card.number | mask: '0000 0000 0000 0000' }} - {{ card.surname }} {{ card.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <mat-dialog-actions align="end">
      <button mat-raised-button (click)="onYesClick()" [disabled]="selectedCard === null">{{ 'confirm' | translate}}</button>
      <button mat-raised-button (click)="onNoClick()">{{ 'cancel' | translate}}</button>
    </mat-dialog-actions>
  `,
  styles: [`

    .mat-input-large {
      width: 100%;
    }

  `]
})
export class SelectCardDialogComponent {

  selectedCard: string | null = null;

  constructor(public dialogRef: MatDialogRef<SelectCardDialogComponent>,
              public translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: {cards$: Observable<Card[]>}) {
    this.dialogRef.disableClose = true;
  }

  onYesClick = () => this.dialogRef.close(this.selectedCard);
  onNoClick = () => this.dialogRef.close();

}
