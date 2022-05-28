import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Contact} from "../../../models/contact";

@Component({
  selector: 'ng-contact-list',
  template: `

    <div style="width: 100%">

      <mat-form-field appearance="outline" style="width: 100%">
        <mat-label>{{ 'transfer.contact.search' | translate }}</mat-label>
        <mat-icon matPrefix>person_search</mat-icon>
        <input
          matInput
          placeholder="{{ 'transfer.contact.search' | translate }}"
          style="margin-left: 10px"
          #search
        >
        <button
          *ngIf="search.value !== ''"
          matSuffix
          mat-icon-button
          (click)="search.value = ''">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <mat-label style="margin-left: 3px">{{ 'transfer.contact.contacts' | translate }}</mat-label>

      <mat-list>
        <mat-list-item *ngFor="let contact of contacts | contactListFilter: search.value | contactListSort">
          <mat-icon mat-list-icon>account_circle</mat-icon>
          <div mat-line>{{ contact.name }} {{contact.surname}}</div>
          <div mat-line>{{ contact.iban | mask: 'SS00 S000 0000 0000 0000 0000 000' | uppercase }}</div>
          <button mat-icon-button (click)="select.emit(contact._id)">
            <mat-icon matTooltip="{{ 'transfer.contact.selectTT' | translate }}">check</mat-icon>
          </button>
          <button mat-icon-button (click)="edit.emit(contact._id)">
            <mat-icon matTooltip="{{ 'transfer.contact.editTT' | translate }}">edit</mat-icon>
          </button>
          <button mat-icon-button (click)="delete.emit(contact._id)">
            <mat-icon matTooltip="{{ 'transfer.contact.removeTT' | translate }}">delete</mat-icon>
          </button>
        </mat-list-item>
      </mat-list>

    </div>

  `
})
export class ContactListComponent {

  @Input() contacts: Contact[] = [];
  @Output() select = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  ngOnInit() {
    console.log(this.contacts);
  }

}
