import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentService} from "../../api/appointment.service";
import {DayWithSlot, DayWithSlots, Location} from "../../models/appointment";
import {AppointmentFormComponent} from "./appointment-form.component";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog.component";
import {filter} from "rxjs";

@Component({
  selector: 'ng-appointment',
  template: `
    <div resizable>

      <mat-sidenav-container autosize style="height: 100%">
        <mat-sidenav #sidenav mode="side" opened="false" position="end">
          <ng-appointmentform
            [slots]="locationSlots"
            (select)="confirmAppointment($event)"
            (cancel)="cleanUp()"
          ></ng-appointmentform>
        </mat-sidenav>
        <div>
          <ng-locationlist
            [locations]="locations"
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

  `]
})
export class AppointmentComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(AppointmentFormComponent) appointmentForm!: AppointmentFormComponent;

  locations: Location[] = [];
  locationSlots: DayWithSlots[] = [];

  constructor(private appointmentService: AppointmentService,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.appointmentService.getLocations()
      .subscribe(locations => {
        this.locations = locations;
      });
  }

  getLocationSlot(locationId: string) {
    this.appointmentService.getLocationSlots(locationId)
      .subscribe(locationSlots => {
        this.locationSlots = locationSlots;
      });
  }

  newAppointment(location: Location) {
    this.getLocationSlot(location._id);
    this.appointmentForm.cleanUp();
    this.sidenav.open();
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
        console.log('...confirmed...');
        /*
        this.cardService.delete(card._id)
          .pipe(
            filter(result => result)
          )
          .subscribe(() => {
            // rimuovo dallo store...
            this.cards = this.cards.filter(c => c._id !== card._id);
            // conferma utente...
            this.snackBar.open(
              this.translate.instant('card.cardDeleted',
                {value: this.maskPipe.transform(card.number, '0000 0000 0000 0000')}),
              undefined,
              {duration: 3000, panelClass: ['sb-success']}
            );
          })
        */
      });
  }

  cleanUp() {
    this.appointmentForm.cleanUp();
    this.sidenav.close()
  }

}
