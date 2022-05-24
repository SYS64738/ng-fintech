import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../models/card";
import {EMPTY, empty, Observable, of} from "rxjs";
import {Location} from "../../models/appointment";

@Component({
  selector: 'ng-locationlist',
  template: `
    <mat-selection-list [multiple]="false">
      <ng-locationlistitem
        *ngFor="let location of locations"
        [location]="location"
        (select)="select.emit($event)"
      >
      </ng-locationlistitem>
    </mat-selection-list>
  `
})
export class LocationListComponent {

  @Input() locations: Location[] = [];
  @Output() select = new EventEmitter<Location>();

}
