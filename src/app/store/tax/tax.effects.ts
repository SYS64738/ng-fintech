import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TaxService} from "../../api/tax.service";
import * as TaxActions from "./tax.actions";
import {catchError, mergeMap, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class TaxEffects {

  constructor(private store: Store,
              private actions: Actions,
              private taxService: TaxService) {}

  insertF24$ = createEffect(() => this.actions.pipe(
    ofType(TaxActions.insertF24),
    mergeMap(action => this.taxService.insert(action.card, action.model).pipe(
      map(() => TaxActions.insertF24Success({ model: action.model })),
      catchError(() => of(TaxActions.insertF24Fail()))
    ))
  ))

}
