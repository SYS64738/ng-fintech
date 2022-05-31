import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from "../../models/card";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ng-cardlistitem',
  template: `
    <mat-list-item *ngIf="card">
      <mat-icon mat-list-icon>credit_card</mat-icon>
      <div mat-line>{{ card.number | mask: '0000 0000 0000 0000' }}</div>
      <div mat-line>{{ 'currency' | translate}} {{ card.amount | customCurrency : translate.currentLang }} - {{ card.type | titlecase}}</div>
      <button mat-icon-button (click)="goToMovements.emit(card)">
        <mat-icon matTooltip="{{ 'card.movementsTT' | translate }}">receipt_long</mat-icon>
      </button>
      <button mat-icon-button (click)="delete.emit(card)">
        <mat-icon matTooltip="{{ 'card.removeTT' | translate }}">delete</mat-icon>
      </button>
    </mat-list-item>
  `,
  styles: [
  ]
})
export class CardListItemComponent {

  @Input() card: Card | null = null;
  @Output() goToMovements = new EventEmitter<Card>();
  @Output() delete = new EventEmitter<Card>();

  constructor(public translate: TranslateService) {}

}
