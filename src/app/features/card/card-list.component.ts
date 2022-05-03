import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../models/card";

@Component({
  selector: 'ng-cardlist',
  template: `
    <mat-list>
      <ng-cardlistitem
        *ngFor="let card of cards"
        [card]="card">
      </ng-cardlistitem>
    </mat-list>
    <div class="center">
      <button mat-raised-button class="button-add" (click)="add.emit()">{{ 'card.add' | translate }}</button>
    </div>
  `,
  styles: [`

    .button-add {
      width: 95%;
    }

  `]
})
export class CardListComponent {

  @Input() cards: Card[] = [];
  @Output() add = new EventEmitter();

}
