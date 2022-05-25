import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CardForm, CardType} from "../../models/card";
import {NgForm} from "@angular/forms";
import {DayWithSlot, DayWithSlots} from "../../models/appointment";

@Component({
  selector: 'ng-appointmentform',
  template: `

    <div class="container">

      <form #f="ngForm">

        <mat-form-field class="mat-input-large" appearance="fill">
          <mat-label>{{ 'appointment.chooseDate' | translate }}</mat-label>
          <input
            matInput
            ngModel name="date"
            [matDatepickerFilter]="calendarFilter"
            [matDatepicker]="picker"
            (ngModelChange)="showSlots($event)"
          >
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

      </form>

      <ng-slotlist
        [dayWithSlots]="selectedDayWithSlot"
        (select)="select.emit($event)"
      ></ng-slotlist>

      <button
        mat-stroked-button
        color="warn"
        class="button-cancel"
        type="button"
        (click)="cancel.emit()"
      >
        {{ 'cancel' | translate }}
      </button>

    </div>

  `,
  styles: [`

    .container {
      margin-left: 20px;
      width: 95%;
    }

    .button-cancel {
      margin-top: 20px;
      width: 100%;
    }

    .mat-input-large {
      width: 100%;
      padding-bottom: 10px;
    }

  `]
})
export class AppointmentFormComponent {

  @ViewChild('f') form!: NgForm;

  @Input() slots: DayWithSlots[] = []
  @Output() select = new EventEmitter<DayWithSlot>();
  @Output() cancel = new EventEmitter();

  selectedDayWithSlot: DayWithSlots | null = null;

  calendarFilter = (d: Date | null): boolean => {
    if (d) {
      return this.slots.findIndex(
        s => (new Date(s.day)).getTime() === (new Date(d)).getTime()
      ) !== -1;
    }
    return true;
  };

  cleanUp() {
    this.selectedDayWithSlot = null;
    this.form.resetForm();
  }

  showSlots(date: any) {
    if (date) {
      this.selectedDayWithSlot = this.slots.find(s => s.day === dateToString(new Date(date)))!;
    }
  }

}

function dateToString(d: Date): string {
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  /*
  if (month.length < 2) {
    month = '0' + month;
  }
  */
  if (day.length < 2) {
    day = '0' + day;
  }
  return [month, day, year].join('/');
}
