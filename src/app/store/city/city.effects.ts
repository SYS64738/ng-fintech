import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CityService} from "../../api/city.service";
import * as CityAction from "./city.actions";
import {catchError, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {getCitiesFail, getCitiesSuccess} from "./city.actions";

@Injectable()
export class CityEffects {

  constructor(private store: Store,
              private actions: Actions,
              private cityService: CityService) {}

  getCities$ = createEffect(() => this.actions.pipe(
    ofType(CityAction.getCities),
    switchMap(() => this.cityService.list().pipe(
      map(cities => getCitiesSuccess( { cities })),
      catchError(() => of(getCitiesFail()))
    ))
  ))

}
