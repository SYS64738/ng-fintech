import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Card, CardForm} from "../../models/card";
import {MatSidenav} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {CardFormComponent} from "./card-form.component";
import {CardService} from "../../api/card.service";
import {MaskPipe} from "ngx-mask";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog.component";
import {filter} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'ng-card',
  template: `
    <div resizable>

      <mat-sidenav-container autosize style="height: 100%">
        <mat-sidenav #sidenav mode="side" opened="false" position="end">
          <ng-cardform
            (add)="insertCard($event)"
            (cancel)="cleanUp()"
          ></ng-cardform>
        </mat-sidenav>
        <div [ngClass]="{'background': sidenav.opened}">
          <ng-cardlist
            [cards]="cards"
            (add)="showCardForm()"
            (delete)="deleteCard($event)"
            (goToMovements)="goToMovements($event)"
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
export class CardComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(CardFormComponent) cardForm!: CardFormComponent;

  cards: Card[] = [];

  constructor(private cardService: CardService,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private maskPipe: MaskPipe,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.cardService.list()
      .subscribe(cards => {
        this.cards = cards;
      });
  }

  insertCard(cardForm: CardForm) {
    // controllo se non l'ho gia'...
    if (this.cards.findIndex(card => card.number === cardForm.number) !== -1) {
      // conferma utente...
      this.snackBar.open(
        this.translate.instant('card.alreadyExists',
          {value: this.maskPipe.transform(cardForm.number, '0000 0000 0000 0000')}),
        undefined,
        {duration: 3000, panelClass: ['sb-warning']}
      );
    } else {
      this.cardService.insert(cardForm)
        .subscribe(card => {
          // aggiungo allo store...
          this.cards = [...this.cards, card];
          // conferma utente...
          this.snackBar.open(
            this.translate.instant('card.cardRegistered',
              {value: this.maskPipe.transform(card.number, '0000 0000 0000 0000')}),
            undefined,
            {duration: 3000, panelClass: ['sb-success']}
          );
          // pulizia...
          this.cleanUp();
        });
    }
  }

  deleteCard(card: Card) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '620px',
      data: {
        title: this.translate.instant('warning'),
        message: this.translate.instant('card.cardDeleteConfirm',
          {value: this.maskPipe.transform(card.number, '0000 0000 0000 0000')})
      }
    });
    dialogRef.afterClosed()
      .pipe(
        filter(dialogResult => dialogResult)
      )
      .subscribe(() => {
        this.cardService.delete(card._id)
          .pipe(
            filter(result => result)
          )
          .subscribe(() => {
            // rimuovo dallo store...
            this.cards = this.cards.filter(c => c._id !== card._id);
            // conferma utente...
            this.snackBar.open(
              this.translate.instant('card.cardDeleted',
                {value: this.maskPipe.transform(card.number, '0000 0000 0000 0000')}),
              undefined,
              {duration: 3000, panelClass: ['sb-success']}
            );
          })
      });
  }

  goToMovements(card: Card) {
    this.router.navigateByUrl(`/movement/${card._id}`);
  }

  showCardForm() {
    this.sidenav.open();
  }

  cleanUp() {
    this.cardForm.cleanUp();
    this.sidenav.close()
  }

}
