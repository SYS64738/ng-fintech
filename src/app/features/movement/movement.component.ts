import {Component, OnInit, ViewChild, } from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {Movement} from "../../models/movement";

@Component({
  selector: 'ng-movement',
  template: `
    <div resizable>

      <mat-form-field class="mat-input-1_3" appearance="fill">
        <mat-label>{{ 'movement.chooseCard' | translate }}</mat-label>
        <mat-select>
          <mat-option
            *ngFor="let card of ['card 1', 'card 2']"
            [value]="card"
          >
            card
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-accordion
        [multi]="true"
        displayMode="flat"
        #accordion="matAccordion"
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
        mat-stroked-button
        class="button-other"
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
    }

  `]
})
export class MovementComponent implements OnInit {

  accordionOpen = false;
  @ViewChild('accordion') accordion!: MatAccordion;

  movements: Movement[] = [
    {
      _id: '1',
      type: 'out',
      amount: 60,
      title: 'Supermarket',
      description: 'Spesa Esselunga',
      cardId: '1',
      timestamp: new Date().getTime()
    },
    {
      _id: '2',
      type: 'in',
      amount: 1500,
      title: 'Mercatino',
      description: 'Vendita chitarra',
      cardId: '1',
      timestamp: new Date().getTime()
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleAll() {
    this.accordionOpen ? this.accordion.closeAll() : this.accordion.openAll();
    this.accordionOpen = !this.accordionOpen;
  }

}
