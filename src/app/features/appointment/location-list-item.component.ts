import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Location} from "../../models/appointment";

@Component({
  selector: 'ng-locationlistitem',
  template: `
    <mat-list-option *ngIf="location" (click)="select.emit(location)">
      <mat-icon mat-list-icon>domain</mat-icon>
      <div mat-line>{{ location.name }}</div>
      <div mat-line>{{ location.address }}</div>
    </mat-list-option>
  `,
  styles: [
  ]
})
export class LocationListItemComponent {

  @Input() location: Location | null = null;
  @Output() select = new EventEmitter<Location>();

}
