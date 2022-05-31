import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {CardService} from "../../api/card.service";
import * as CardActions from "./card.actions";
import {catchError, mergeMap, of, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class CardEffects {

  constructor(private store: Store,
              private actions: Actions,
              private cardService: CardService) {}

  getCards$ = createEffect(() => this.actions.pipe(
    ofType(CardActions.getCards),
    switchMap(() => this.cardService.list().pipe(
      map(cards => CardActions.getCardsSuccess({ cards })),
      catchError(() => of(CardActions.getCardsFail()))
    ))
  ))

  insertCard$ = createEffect(() => this.actions.pipe(
    ofType(CardActions.insertCard),
    mergeMap(action => this.cardService.insert(action.cardForm).pipe(
      map(card => CardActions.insertCardSuccess({ card })),
      catchError(() => of(CardActions.insertCardFail()))
    ))
  ))

  deleteCard$ = createEffect(() => this.actions.pipe(
    ofType(CardActions.deleteCard),
    mergeMap(action => this.cardService.delete(action.id).pipe(
      map(() => CardActions.deleteCardSuccess({ id: action.id })),
      catchError(() => of(CardActions.deleteCardFail()))
    ))
  ))

}
