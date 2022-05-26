import {Component, OnInit, ViewChild} from '@angular/core';
import {Card, CardForm} from "../../models/card";
import {MatSidenav} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {CardFormComponent} from "./card-form.component";
import {MaskPipe} from "ngx-mask";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog.component";
import {filter} from "rxjs";
import {Router} from "@angular/router";
import {CardStore} from "../../store/card.store";

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
            [cards]="(cards$ | async) ?? []"
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

  // cards: Card[] = [];
  cards$ = this.cardStore.card$;

  constructor(public cardStore: CardStore,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private maskPipe: MaskPipe,
              private dialog: MatDialog,
              private router: Router) {
    // this.cards$ = this.cardStore.card$;
  }

  ngOnInit() {
    this.cardStore.list();
  }

  insertCard(cardForm: CardForm) {
    // controllo se non l'ho gia'...
    if (this.cardStore.alreadyExists(cardForm.number)) {
      // conferma utente...
      this.snackBar.open(
        this.translate.instant('card.alreadyExists',
          {value: this.maskPipe.transform(cardForm.number, '0000 0000 0000 0000')}),
        undefined,
        {duration: 3000, panelClass: ['sb-warning']}
      );
    } else {
      this.cardStore.insert(cardForm)
        .subscribe(card => {
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
        this.cardStore.delete(card._id)
          .pipe(
            filter(result => result)
          )
          .subscribe(() => {
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
