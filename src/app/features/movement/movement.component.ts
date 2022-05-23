import {Component, OnInit, ViewChild,} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {Movement} from "../../models/movement";
import {CardService} from "../../api/card.service";
import {Card} from "../../models/card";
import {BehaviorSubject, combineLatest, filter} from "rxjs";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'ng-movement',
  template: `
    <div resizable>

      <div class="header">
        <mat-form-field class="mat-input-1_3" appearance="fill">
          <mat-label>{{ 'movement.chooseCard' | translate }}</mat-label>
          <mat-select
            [ngModel]="selectedCardId$ | async"
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
        <h3 *ngIf="movements.length > 0">{{ 'movement.menu' | translate }}: {{ movements.length }} / {{ totalMovements }}</h3>
      </div>

      <mat-accordion
        [multi]="true"
        displayMode="flat"
      >
        <ng-movementlistitem *ngFor="let movement of movements"
          [referenceDate]="movement.timestamp | date: 'dd/MM/yyyy'"
          [amount]="movement.amount"
          [type]="movement.type"
          [title]="movement.title"
          [description]="movement.description"
        ></ng-movementlistitem>
      </mat-accordion>

      <button
        *ngIf="movements.length > 0 && movements.length < totalMovements"
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

  cards$ = new BehaviorSubject<Card[]>([]);
  selectedCardId$ = new BehaviorSubject<string>('');
  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$])
    .pipe(
      map(([cards, cardId]) => cards.find(c => c._id === cardId))
    )

  activeCardId: string | null = null;
  movements: Movement[] = [];
  totalMovements: number = 0;
  currentOffset: number = 0;

  constructor(private cardService: CardService,
              private activatedRouted: ActivatedRoute) {
    if (activatedRouted.snapshot.params.hasOwnProperty('cardId')) {
      this.selectedCardId$.next(activatedRouted.snapshot.params['cardId']);
      this.activeCardId = activatedRouted.snapshot.params['cardId'];
      this.cardChange(this.activeCardId!);
    }
  }

  ngOnInit(): void {
    throw new Error('minchia');
    this.getCards();
  }

  getCards(): void {
    this.cardService.list()
      .subscribe(cards => {
        this.cards$.next(cards);
      });
  }

  cardChange(cardId: string): void {
    console.log('cardChange', cardId);
    // riazzero l'ambiente...
    this.movements = [];
    this.totalMovements = 0;
    this.currentOffset = 0;
    // la carta diventa quella attiva...
    this.activeCardId = cardId;
    // estraggo i movimenti della carta...
    this.getMovements();
  }

  getNextMovements() {
    // incremento l'offset...
    this.currentOffset += environment.movementLimit;
    // estraggo i prossimi movimenti...
    this.getMovements();
  }

  getMovements() {
    this.cardService.listMovements(this.activeCardId!, environment.movementLimit, this.currentOffset)
      .pipe(
        filter(result => result.data && result.data.length > 0)
      )
      .subscribe(result => {
        // salvo comunque il totale...
        this.totalMovements = result.total;
        this.movements = [...this.movements, ...result.data];
      });
  }

  toggleAll() {
    this.accordionOpen ? this.accordion.closeAll() : this.accordion.openAll();
    this.accordionOpen = !this.accordionOpen;
  }

}
