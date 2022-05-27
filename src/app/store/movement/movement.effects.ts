import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {CardService} from "../../api/card.service";
import {catchError, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {getMovements, getMovementsFail, getMovementsSuccess, getNextMovements, setCard} from "./movement.actions";
import {selectCard, selectLimit, selectOffset} from "./movement.selectors";

@Injectable()
export class MovementEffects {

  constructor(private store: Store,
              private actions: Actions,
              private cardService: CardService) {}

  getMovements$ = createEffect(() => this.actions.pipe(
    ofType(getMovements),
    concatLatestFrom(() =>
      [
        this.store.select(selectLimit),
        this.store.select(selectOffset)
      ]
    ),
    switchMap(([action, limit, offset]) => this.cardService.listMovements(action.cardId, limit as number, offset as number).pipe(
      map(movements => getMovementsSuccess({ movements })),
      catchError(() => of(getMovementsFail()))
    ))
  ))

  getNextMovement$ = createEffect(() => this.actions.pipe(
    ofType(getNextMovements),
    concatLatestFrom(() =>
      [
        this.store.select(selectCard),
        this.store.select(selectLimit),
        this.store.select(selectOffset)
      ]
    ),
    map(([action, card, limit, offset]) => getMovements({cardId: card!, limit, offset}))
  ))

  setCard$ = createEffect(() => this.actions.pipe(
    ofType(setCard),
    map(action => getMovements({cardId: action.card}))
  ))

}
