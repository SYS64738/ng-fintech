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
          <div *ngIf="selectedLocation"
               class="container"
          >
            <ng-leaflet
              [location]="selectedLocation.name"
              [coords]="selectedLocation.coords"
            ></ng-leaflet>
          </div>
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

    .container {
      width: 95%;
      margin-left: 20px;
      margin-bottom: 20px;
    }

  `]
})
export class AppointmentComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(AppointmentFormComponent) appointmentForm!: AppointmentFormComponent;

  locations: Location[] = [];
  locationSlots: DayWithSlots[] = [];
  selectedLocation: Location | null = null;

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
    this.selectedLocation = location;
    this.getLocationSlot(this.selectedLocation._id);
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
        this.appointmentService.schedule(dayWithSlot)
          .pipe(
            filter(result => result)
          )
          .subscribe(() => {
            // conferma utente...
            this.snackBar.open(
              this.translate.instant('appointment.confirmed'),
              undefined,
              {duration: 3000, panelClass: ['sb-success']}
            );
          })
      });
  }

  cleanUp() {
    this.appointmentForm.cleanUp();
    this.sidenav.close()
  }

}
