import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../models/card";
import {EMPTY, empty, Observable, of} from "rxjs";

@Component({
  selector: 'ng-cardlist',
  template: `
    <mat-list>
      <ng-cardlistitem
        *ngFor="let card of cards"
        [card]="card"
        (delete)="delete.emit($event)"
        (goToMovements)="goToMovements.emit($event)"
      >
      </ng-cardlistitem>
    </mat-list>
    <div class="center">
      <button mat-raised-button class="button-add" (click)="add.emit()">{{ 'card.add' | translate }}</button>
    </div>
  `,
  styles: [`

    .button-add {
      width: 95%;
      margin-top: 10px;
    }

  `]
})
export class CardListComponent {

  @Input() cards: Card[] = [];
  @Output() add = new EventEmitter();
  @Output() delete = new EventEmitter<Card>();
  @Output() goToMovements = new EventEmitter<Card>();

}
