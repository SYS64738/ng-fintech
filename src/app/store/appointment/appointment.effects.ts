import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AppointmentService} from "../../api/appointment.service";
import * as AppointmentActions from "./appointment.actions";
import {catchError, exhaustMap, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {getLocationSlotsFail} from "./appointment.actions";

@Injectable()
export class AppointmentEffects {

  constructor(private store: Store,
              private actions: Actions,
              private appointmentService: AppointmentService) {}

  getLocations$ = createEffect(() => this.actions.pipe(
    ofType(AppointmentActions.getLocations),
    switchMap(() => this.appointmentService.getLocations().pipe(
      map(locations => AppointmentActions.getLocationsSuccess({ locations })),
      catchError(() => of(AppointmentActions.getLocationsFail))
    ))
  ));

  getLocationSlots$ = createEffect(() => this.actions.pipe(
    ofType(AppointmentActions.getLocationSlots),
    switchMap((action) => this.appointmentService.getLocationSlots(action.locationId).pipe(
      map(dayWithSlots => AppointmentActions.getLocationSlotsSuccess({ dayWithSlots })),
      catchError(() => of(AppointmentActions.getLocationSlotsFail))
    ))
  ));

  schedule$ = createEffect(() => this.actions.pipe(
    ofType(AppointmentActions.schedule),
    exhaustMap((action) => this.appointmentService.schedule(action.dayWithSlot).pipe(
      map(() => AppointmentActions.scheduleSuccess()),
      catchError(() => of(AppointmentActions.scheduleFail))
    ))
  ));

}
