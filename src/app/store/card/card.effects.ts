import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {CardService} from "../../api/card.service";
import {
  insertCard,
  insertCardFail,
  insertCardSuccess,
  getCards,
  getCardsFail,
  getCardsSuccess,
  deleteCard, deleteCardFail, deleteCardSuccess
} from "./card.actions";
import {catchError, mergeMap, of, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class CardEffects {

  constructor(private store: Store,
              private actions: Actions,
              private cardService: CardService) {}

  getCards$ = createEffect(() => this.actions.pipe(
    ofType(getCards),
    switchMap(() => this.cardService.list().pipe(
      map(cards => getCardsSuccess({ cards })),
      catchError(() => of(getCardsFail()))
    ))
  ))

  insertCard$ = createEffect(() => this.actions.pipe(
    ofType(insertCard),
    mergeMap(action => {
      return this.cardService.insert(action.cardForm).pipe(
        map(card => insertCardSuccess({ card })),
        catchError(() => of(insertCardFail))
      )
    })
  ))

  deleteCard$ = createEffect(() => this.actions.pipe(
    ofType(deleteCard),
    mergeMap(action => {
      return this.cardService.delete(action.id).pipe(
        map(card => deleteCardSuccess({ id: action.id })),
        catchError(() => of(deleteCardFail))
      )
    })
  ))

}
