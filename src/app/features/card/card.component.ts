import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Card, CardForm} from "../../models/card";
import {MatSidenav} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {CardFormComponent} from "./card-form.component";
import {MaskPipe} from "ngx-mask";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog.component";
import {filter, Subscription, take} from "rxjs";
import {Router} from "@angular/router";
import {ActionsSubject, Store} from "@ngrx/store";
import {existsCard, selectCards} from "../../store/card/card.selectors";
import {insertCard, insertCardSuccess, getCards, deleteCard, deleteCardSuccess} from "../../store/card/card.actions";
import {Actions, ofType} from "@ngrx/effects";
import {map} from "rxjs/operators";

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
export class CardComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(CardFormComponent) cardForm!: CardFormComponent;

  cards$ = this.store.select(selectCards);
  actionsSubscriptions = new Subscription();

  constructor(public store: Store,
              private actionListener$: Actions,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private maskPipe: MaskPipe,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.addInsertCardHook();
    this.addDeleteCardHook();
    this.store.dispatch(getCards());
  }

  ngOnDestroy() {
    this.actionsSubscriptions.unsubscribe();
  }

  addInsertCardHook() {
    this.actionsSubscriptions.add(
      this.actionListener$.pipe(
        ofType(insertCardSuccess),
        map(data => data.card)
      ).subscribe(card => {
        // conferma utente...
        this.snackBar.open(
          this.translate.instant('card.cardRegistered',
            {value: this.maskPipe.transform(card.number, '0000 0000 0000 0000')}),
          undefined,
          {duration: 3000, panelClass: ['sb-success']}
        );
        // pulizia...
        this.cleanUp();
      })
    );
  }

  addDeleteCardHook() {
    this.actionsSubscriptions.add(
      this.actionListener$.pipe(
        ofType(deleteCardSuccess),
      ).subscribe(card => {
        // conferma utente...
        this.snackBar.open(
          this.translate.instant('card.cardDeleted'),
          undefined,
          {duration: 3000, panelClass: ['sb-success']}
        );
        // pulizia...
        this.cleanUp();
      })
    );
  }

  insertCard(cardForm: CardForm) {
    this.store.select(existsCard(cardForm.number)).pipe(
      take(1)
    ).subscribe(alreadyExists => {
      if (alreadyExists) {
        // carta gia' esistente...
        this.snackBar.open(
          this.translate.instant('card.alreadyExists',
            {value: this.maskPipe.transform(cardForm.number, '0000 0000 0000 0000')}),
          undefined,
          {duration: 3000, panelClass: ['sb-warning']}
        );
      } else {
        // mando avanti l'inserimento...
        this.store.dispatch(insertCard({ cardForm }));
      }
    });
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
    dialogRef.afterClosed().pipe(
      filter(dialogResult => dialogResult)
    ).subscribe(() => this.store.dispatch(deleteCard({ id: card._id })));
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
