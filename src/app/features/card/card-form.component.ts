import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {CardForm, CardType} from "../../models/card";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'ng-cardform',
  template: `

    <div class="container">
      <form #f="ngForm" (ngSubmit)="add.emit(f.value)">

        <mat-form-field class="mat-input-large" appearance="fill">
          <mat-label>{{ 'card.type' | translate }}</mat-label>
          <mat-select
            ngModel name="type"
            placeholder="{{ 'card.type' | translate }}"
            #typeRef="ngModel"
            required
          >
            <mat-option
              *ngFor="let type of cardTypes"
              [value]="type"
            >
              {{ type | titlecase }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="typeRef.hasError('required') && f.dirty">
            {{ 'card.typeRequired' | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field class="mat-input-left" appearance="fill">
          <mat-label>{{ 'card.name' | translate }}</mat-label>
          <input
            matInput
            autocomplete="off"
            ngModel name="name"
            #nameRef="ngModel"
            placeholder="{{ 'card.name' | translate }}"
            required
          >
          <mat-error *ngIf="nameRef.hasError('required') && f.dirty">
            {{ 'card.nameRequired' | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field class="mat-input-right" appearance="fill">
          <mat-label>{{ 'card.surname' | translate }}</mat-label>
          <input
            matInput
            autocomplete="off"
            ngModel name="surname"
            #surnameRef="ngModel"
            placeholder="{{ 'card.surname' | translate }}"
            required
          >
          <mat-error *ngIf="surnameRef.hasError('required') && f.dirty">
            {{ 'card.surnameRequired' | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field class="mat-input-large" appearance="fill">
          <mat-label>{{ 'card.number' | translate }}</mat-label>
          <input
            matInput
            autocomplete="off"
            ngModel name="number"
            #numberRef="ngModel"
            placeholder="{{ 'card.number' | translate }}"
            required
            mask="0000 0000 0000 0000"
          >
          <mat-error *ngIf="numberRef.hasError('required') && f.dirty">
            {{ 'card.numberRequired' | translate }}
          </mat-error>
          <mat-error *ngIf="numberRef.hasError('mask') && f.dirty">
            {{ 'card.numberValidRequired' | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field class="mat-input-large" appearance="fill">
          <mat-label>{{ 'card.securityCode' | translate }}</mat-label>
          <input
            matInput
            autocomplete="off"
            ngModel name="securityCode"
            #securityCodeRef="ngModel"
            placeholder="{{ 'card.securityCode' | translate }}"
            required
            mask="000"
          >
          <mat-error *ngIf="securityCodeRef.hasError('required') && f.dirty">
            {{ 'card.securityCodeRequired' | translate }}
          </mat-error>
          <mat-error *ngIf="securityCodeRef.hasError('mask') && f.dirty">
            {{ 'card.securityCodeValidRequired' | translate }}
          </mat-error>
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          class="button-add"
          [disabled]="!f.valid"
        >
          {{ 'card.add' | translate }}
        </button>
        <button
          mat-stroked-button
          color="warn"
          class="button-cancel"
          type="button"
          (click)="cancel.emit()"
        >
          {{ 'cancel' | translate }}
        </button>

      </form>
    </div>

  `,
  styles: [`

    .container {
      margin-left: 20px;
      width: 95%;
    }

    .button-add {
      width: 100%;
    }

    .button-cancel {
      margin-top: 10px;
      width: 100%;
    }

    .mat-input-left {
      float: left;
      width: 48%;
      padding-bottom: 10px;
    }

    .mat-input-right {
      float: right;
      width: 48%;
      padding-bottom: 10px;
    }

    .mat-input-large {
      width: 100%;
      padding-bottom: 10px;
    }

  `]
})
export class CardFormComponent {

  @ViewChild('f') form!: NgForm;

  cardTypes: string[] = ['visa', 'mastercard'];

  @Output() add = new EventEmitter<CardForm>();
  @Output() cancel = new EventEmitter();

  cleanUp() {
    this.form.resetForm();
  }

}
