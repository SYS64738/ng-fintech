import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Card} from "../../models/card";
import {EMPTY, empty, Observable, of} from "rxjs";
import {DayWithSlot, DayWithSlots, Location, Slot} from "../../models/appointment";

@Component({
  selector: 'ng-slotlist',
  template: `
    <ng-container *ngIf="dayWithSlots">
      <mat-label style="margin-left: 10px">{{ 'appointment.slotsAvailable' | translate }}</mat-label>
      <mat-selection-list [multiple]="false">
        <mat-list-option *ngFor="let slot of dayWithSlots.slots" (click)="slotChoose(slot)">
          <mat-icon mat-list-icon>schedule</mat-icon>
          <div mat-line>{{ slot }}</div>
        </mat-list-option>
      </mat-selection-list>
    </ng-container>
  `
})
export class SlotListComponent {

  @Input() dayWithSlots: DayWithSlots | null = null;
  @Output() select = new EventEmitter<DayWithSlot>();

  slotChoose(slot: Slot) {
    this.select.emit({day: this.dayWithSlots!.day, slot});
  }

}
