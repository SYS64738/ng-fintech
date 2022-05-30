import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TransferService} from "../../api/transfer.service";
import * as TransferActions from "./transfer.actions";
import {catchError, mergeMap, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class TransferEffects {

  constructor(private store: Store,
              private actions: Actions,
              private transferService: TransferService) {}

  insertTransfer$ = createEffect(() => this. actions.pipe(
    ofType(TransferActions.insertTransfer),
    mergeMap(action => this.transferService.transfer(action.transfer).pipe(
      map(() => TransferActions.insertTransferSuccess({ transfer: action.transfer})),
      catchError(() => of(TransferActions.insertTransferFail()))
    ))
  ))

}
