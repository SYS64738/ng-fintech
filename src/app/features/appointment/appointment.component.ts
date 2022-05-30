import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentService} from "../../api/appointment.service";
import {DayWithSlot, Location} from "../../models/appointment";
import {AppointmentFormComponent} from "./appointment-form.component";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog.component";
import {filter, Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {selectLocations, selectedLocation, selectDayWithSlots} from "../../store/appointment/appointment.selectors";
import {
  getLocations,
  getLocationSlots,
  getLocationSlotsSuccess, schedule,
  scheduleSuccess
} from "../../store/appointment/appointment.actions";
import {Actions, ofType} from "@ngrx/effects";


@Component({
  selector: 'ng-appointment',
  template: `
    <div resizable>

      <mat-sidenav-container autosize style="height: 100%">
        <mat-sidenav #sidenav mode="side" opened="false" position="end">
          <div *ngIf="(selectedLocation$ | async) as l"
               class="container"
          >
            <ng-leaflet
              [location]="l.name"
              [coords]="l.coords"
            ></ng-leaflet>
          </div>
          <ng-appointmentform
            [slots]="(locationsSlot$ | async) ?? []"
            (select)="confirmAppointment($event)"
            (cancel)="cleanUp()"
          ></ng-appointmentform>
        </mat-sidenav>
        <div>
          <ng-locationlist
            [locations]="(locations$ | async) ?? []"
            (select)="newAppointment($event)"
          ></ng-locationlist>
        </div>
      </mat-sidenav-container>

    </div>
  `,
  styles: [`

    mat-sidenav {
      width: 60%;
    }

    .container {
      width: 95%;
      margin-left: 20px;
      margin-bottom: 20px;
    }

  `]
})
export class AppointmentComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(AppointmentFormComponent) appointmentForm!: AppointmentFormComponent;

  locations$ = this.store.select(selectLocations);
  locationsSlot$ = this.store.select(selectDayWithSlots);
  selectedLocation$: Observable<Location | undefined> | null = null;

  actionsSubscriptions = new Subscription();

  constructor(public store: Store,
              private actionListener$: Actions,
              private appointmentService: AppointmentService,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.addGetLocationSlotsHook();
    this.addScheduleHook();
    this.store.dispatch(getLocations());
  }

  ngOnDestroy() {
    this.actionsSubscriptions.unsubscribe();
  }

  addGetLocationSlotsHook() {
    this.actionsSubscriptions.add(
      this.actionListener$.pipe(
        ofType(getLocationSlotsSuccess),
      ).subscribe(() => {
        // pulizia...
        this.appointmentForm.cleanUp();
        this.sidenav.open();
      })
    );
  }

  addScheduleHook() {
    this.actionsSubscriptions.add(
      this.actionListener$.pipe(
        ofType(scheduleSuccess),
      ).subscribe(() => {
        // pulizia...
        this.cleanUp();
        // conferma utente...
        this.snackBar.open(
          this.translate.instant('appointment.confirmed'),
          undefined,
          {duration: 3000, panelClass: ['sb-success']}
        );
      })
    );
  }

  newAppointment(location: Location) {
    this.store.dispatch(getLocationSlots({ locationId: location._id }));
    this.selectedLocation$ = this.store.select(selectedLocation(location._id));
  }

  confirmAppointment(dayWithSlot: DayWithSlot) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '620px',
      data: {
        title: this.translate.instant('appointment.confirmTitle'),
        message: this.translate.instant('appointment.confirmMessage',
          {day: dayWithSlot.day, time: dayWithSlot.slot})
      }
    });
    dialogRef.afterClosed()
      .pipe(
        filter(dialogResult => dialogResult)
      )
      .subscribe(() => {
        this.store.dispatch(schedule({ dayWithSlot }));
      });
  }

  cleanUp() {
    this.appointmentForm.cleanUp();
    this.sidenav.close()
  }

}
