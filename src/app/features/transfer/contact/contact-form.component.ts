import {Component, Output, EventEmitter, Input, OnInit, OnChanges} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Contact, ContactForm} from "../../../models/contact";

@Component({
  selector: 'ng-contact-form',
  template: `

    <form [formGroup]="contactForm" (ngSubmit)="save.emit(contactForm.value)">

      <mat-form-field class="mat-input-large" appearance="fill">
        <mat-label>{{ 'transfer.name' | translate }}</mat-label>
        <input
          formControlName="name"
          matInput
          autocomplete="off"
          placeholder="{{ 'transfer.name' | translate }}"
        >
        <mat-error>
          {{ 'transfer.nameRequired' | translate }}
        </mat-error>
      </mat-form-field>

      <mat-form-field class="mat-input-large" appearance="fill">
        <mat-label>{{ 'transfer.surname' | translate }}</mat-label>
        <input
          formControlName="surname"
          matInput
          autocomplete="off"
          placeholder="{{ 'transfer.surname' | translate }}"
        >
        <mat-error>
          {{ 'transfer.surnameRequired' | translate }}
        </mat-error>
      </mat-form-field>

      <mat-form-field class="mat-input-large" appearance="fill">
        <mat-label>{{ 'transfer.iban' | translate }}</mat-label>
        <input
          formControlName="iban"
          matInput
          autocomplete="off"
          placeholder="{{ 'transfer.iban' | translate }}"
          mask="SS00 S000 0000 0000 0000 0000 000"
          class="uppercase"
        >
        <mat-error>
          {{ 'transfer.ibanRequired' | translate }}
        </mat-error>
      </mat-form-field>

      <button
        mat-raised-button
        class="button"
        color="primary"
        [disabled]="!contactForm.valid || (contact && !contactForm.dirty)"
      >{{ 'transfer.contact.save' | translate }}
      </button>

    </form>

  `,
  styles: [`

    .button {
      width: 100%;
    }

    .mat-input-large {
      width: 100%;
      padding-bottom: 10px;
    }

  `]
})
export class ContactFormComponent implements OnChanges {

  @Input() contact: Contact | null = null;
  @Output() save = new EventEmitter<ContactForm>();

  contactForm = this.fb.group({
     name: ['', Validators.required],
     surname: ['', Validators.required],
     iban: ['', Validators.required]
   });

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.contact) {
      this.contactForm.patchValue({
        name: this.contact.name,
        surname: this.contact.surname,
        iban: this.contact.iban
      })
    }
  }

}
