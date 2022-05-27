import {Component, OnInit, ViewChild,} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {ActivatedRoute} from "@angular/router";
import {selectCards} from "../../store/card/card.selectors";
import {Store} from "@ngrx/store";
import {getCards} from "../../store/card/card.actions";
import {getNextMovements, setCard} from "../../store/movement/movement.actions";
import {
  isOtherMovements,
  selectCard,
  selectMovements, selectPartial, selectTotal
} from "../../store/movement/movement.selectors";

@Component({
  selector: 'ng-movement',
  template: `
    <div resizable>

      <div class="header">
        <mat-form-field class="mat-input-1_3" appearance="fill">
          <mat-label>{{ 'movement.chooseCard' | translate }}</mat-label>
          <mat-select
            [ngModel]="selectedCard$ | async"
          >
            <mat-option
              *ngFor="let card of (cards$ | async)"
              [value]="card._id"
              (click)="cardChange(card._id)"
            >
              {{ card.number | mask: '0000 0000 0000 0000' }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <ng-container *ngIf="(partialMovements$ | async) as m">
            <h3 *ngIf="m > 0">{{ 'movement.menu' | translate }}: {{ m }} / {{ totalMovements$ | async }}</h3>
        </ng-container>
      </div>

      <mat-accordion
        [multi]="true"
        displayMode="flat"
      >
        <ng-movementlistitem *ngFor="let movement of (movements$ | async)"
          [referenceDate]="movement.timestamp | date: 'dd/MM/yyyy'"
          [amount]="movement.amount"
          [type]="movement.type"
          [title]="movement.title"
          [description]="movement.description"
        ></ng-movementlistitem>
      </mat-accordion>

      <button
        *ngIf="isOtherMovements$ | async"
        mat-stroked-button
        class="button-other"
        (click)="getNextMovements()"
      >
        {{ 'movement.loadNext' | translate }}
      </button>

      <button class="fab-toggle-accordion" mat-fab (click)="toggleAll()">
        <mat-icon *ngIf="accordionOpen" matTooltip="{{ 'collapseAll' | translate }}">vertical_align_center</mat-icon>
        <mat-icon *ngIf="!accordionOpen" matTooltip="{{ 'expandAll' | translate }}">format_line_spacing</mat-icon>
      </button>

    </div>
  `,
  styles: [`

    .header {
      display: flex;
      justify-content: space-between;
      margin-left: 15px;
    }

    .fab-toggle-accordion {
      position: fixed;
      bottom: 20px;
      right: 30px;
      z-index: 999;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }

    .mat-input-1_3 {
      width: 30%;
    }

    .button-other {
      width: 100%;
      margin-bottom: 10px;
    }

  `]
})
export class MovementComponent implements OnInit {

  accordionOpen = false;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  cards$ = this.store.select(selectCards);
  selectedCard$ = this.store.select(selectCard)
  movements$ = this.store.select(selectMovements);
  isOtherMovements$ = this.store.select(isOtherMovements);
  totalMovements$ = this.store.select(selectTotal);
  partialMovements$ = this.store.select(selectPartial);

  constructor(public store: Store,
              private activatedRouted: ActivatedRoute) {
    if (activatedRouted.snapshot.params.hasOwnProperty('cardId')) {
      const paramCardId = activatedRouted.snapshot.params['cardId'];
      this.cardChange(paramCardId);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(getCards());
  }

  cardChange = (cardId: string) => this.store.dispatch(setCard({card: cardId}));
  getNextMovements = () => this.store.dispatch(getNextMovements());

  toggleAll() {
    this.accordionOpen ? this.accordion.closeAll() : this.accordion.openAll();
    this.accordionOpen = !this.accordionOpen;
  }

}
