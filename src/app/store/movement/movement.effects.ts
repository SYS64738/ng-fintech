import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {CardService} from "../../api/card.service";
import {catchError, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import * as MovementAction from "./movement.actions";
import {selectCard, selectLimit, selectOffset} from "./movement.selectors";

@Injectable()
export class MovementEffects {

  constructor(private store: Store,
              private actions: Actions,
              private cardService: CardService) {}

  getMovements$ = createEffect(() => this.actions.pipe(
    ofType(MovementAction.getMovements),
    concatLatestFrom(() =>
      [
        this.store.select(selectLimit),
        this.store.select(selectOffset)
      ]
    ),
    switchMap(([action, limit, offset]) => this.cardService.listMovements(action.cardId, limit, offset).pipe(
      map(movements => MovementAction.getMovementsSuccess({ movements })),
      catchError(() => of(MovementAction.getMovementsFail()))
    ))
  ))

  getNextMovement$ = createEffect(() => this.actions.pipe(
    ofType(MovementAction.getNextMovements),
    concatLatestFrom(() =>
      [
        this.store.select(selectCard),
        this.store.select(selectLimit),
        this.store.select(selectOffset)
      ]
    ),
    map(([action, card, limit, offset]) => MovementAction.getMovements({cardId: card!, limit, offset}))
  ))

  setCard$ = createEffect(() => this.actions.pipe(
    ofType(MovementAction.setCard),
    map(action => MovementAction.getMovements({cardId: action.card}))
  ))

}
