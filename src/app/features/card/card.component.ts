import {Component, ElementRef, ViewChild} from '@angular/core';
import {Card, CardForm} from "../../models/card";
import {MatSidenav} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {CardFormComponent} from "./card-form.component";

@Component({
  selector: 'ng-card',
  template: `
    <div resizable>

      <mat-sidenav-container autosize style="height: 100%">
        <mat-sidenav #sidenav mode="side" opened="false" position="end">
          <ng-cardform
            (add)="addCardConfirm($event)"
            (cancel)="cleanUp()"
          ></ng-cardform>
        </mat-sidenav>
        <div [ngClass]="{'background': sidenav.opened}">
          <ng-cardlist
            [cards]="cards"
            (add)="addCard()"
          ></ng-cardlist>
        </div>
      </mat-sidenav-container>

    </div>
  `,
  styles: [`

    mat-sidenav {
      width: 60%;
    }

    .background {
      opacity: 0.2;
    }

  `]
})
export class CardComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(CardFormComponent) cardForm!: CardFormComponent;

  cards: Card[] = [
    {
      _id: '1',
      number: '1234123412341234',
      type: 'mastercard',
      ownerId: 'rch',
      owner: 'Roberto Chionna',
      amount: 1200
    },
    {
      _id: '2',
      number: '1234123412341234',
      type: 'visa',
      ownerId: 'dzo',
      owner: 'Donatella Zotti',
      amount: 1100
    }
  ];

  constructor(private snackBar: MatSnackBar,
              private translate: TranslateService) {}

  addCard() {
    this.sidenav.open();
  }

  cleanUp() {
    this.cardForm.cleanUp();
    this.sidenav.close()
  }

  addCardConfirm(cardForm: CardForm) {
    // TODO: se non l'ho gia'...
    this.cards = [...this.cards, {
      _id: (this.cards.length + 1).toString(),
      number: cardForm.number,
      ownerId: cardForm.surname,
      owner: cardForm.surname + ' ' + cardForm.name,
      type: cardForm.type,
      amount: 0
    }];
    console.log(cardForm);
    this.snackBar.open(
      this.translate.instant('card.cardRegistered'),
      undefined,
      {duration: 3000, panelClass: ['sb-success']}
    );
    this.cleanUp();
  }

}
