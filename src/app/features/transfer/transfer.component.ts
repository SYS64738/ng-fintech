import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CardService} from "../../api/card.service";
import {Card} from "../../models/card";
import {MatDialog} from "@angular/material/dialog";
import {filter} from "rxjs";
import {ContactComponent} from "./contact/contact.component";
import {Contact} from "../../models/contact";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {TransferService} from "../../api/transfer.service";
import {TransferForm} from "../../models/transfer";
import {TransferValidator} from "./transfer.validator";

@Component({
  selector: 'ng-transfer',
  template: `
    <div resizable>

      <div class="container">

        <button
          mat-stroked-button
          class="button"
          style="margin-bottom: 20px"
          (click)="selectContact()"
        >{{ 'transfer.contact.contacts' | translate }}
        </button>

        <form [formGroup]="transferForm" #formDirective="ngForm" (ngSubmit)="doTransfer(formDirective)">

          <ng-container formGroupName="contact">

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

          </ng-container>

          <ng-container formGroupName="transfer">

            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'transfer.amount' | translate }}</mat-label>
              <input
                formControlName="amount"
                matInput
                autocomplete="off"
                placeholder="{{ 'transfer.amount' | translate }}"
                mask="separator.2"
                prefix="{{ 'currency' | translate }} "
                thousandSeparator="."
              >
              <mat-error>
                {{ 'transfer.amountRequired' | translate }}
              </mat-error>
            </mat-form-field>

            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'transfer.chooseCard' | translate }}</mat-label>
              <mat-select
                formControlName="card"
              >
                <mat-option
                  *ngFor="let card of cards"
                  [value]="card._id"
                >
                  {{ card.number | mask: '0000 0000 0000 0000' }}
                </mat-option>
              </mat-select>
            </mat-form-field>

          </ng-container>

          <div *ngIf="transfer.hasError('transfer')"
               style="margin-bottom: 30px; display: flex; align-content: center; justify-content: center; width: 100%"
          >
            <mat-chip-list>
              <mat-chip color="warn" selected>
                {{ 'transfer.unavailableAmount' | translate }}{{ 'currency' | translate }} {{ transfer.errors!['transfer'] | mask: 'separator.2' : '.' }}
              </mat-chip>
            </mat-chip-list>
          </div>

          <button
            mat-raised-button
            class="button"
            [disabled]="!transferForm.valid"
          >{{ 'transfer.transfer' | translate }}
          </button>

        </form>

      </div>

      <!--
      <pre> {{ transferForm.value | json }}</pre>
      -->

    </div>
  `,
  styles: [`

    .container {
      width: 50%;
      margin:0 auto;
    }

    .button {
      width: 100%;
    }

    .mat-input-large {
      width: 100%;
      padding-bottom: 10px;
    }

  `]
})
export class TransferComponent implements OnInit {

  cards: Card[] = [];

  transferForm = this.fb.group({
    contact: this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      iban: ['', Validators.required]
    }),
    transfer: this.fb.group({
      amount: [null, Validators.required],
      card: ['', Validators.required],
    }, {
      asyncValidators: [this.transferValidator.validate()]
    })
  });

  constructor(private fb: FormBuilder,
              private cardService: CardService,
              private transferService: TransferService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private transferValidator: TransferValidator) {}

  ngOnInit(): void {
    this.getCards();
  }

  get contact(): FormGroup {
    return this.transferForm.get('contact') as FormGroup;
  }

  get transfer(): FormGroup {
    return this.transferForm.get('transfer') as FormGroup;
  }

  getCards(): void {
    this.cardService.list()
      .subscribe(cards => {
        this.cards = cards;
      });
  }

  selectContact() {
    const dialogRef = this.dialog.open(ContactComponent, {
      width: '600px'
    });
    dialogRef.afterClosed()
      .pipe(
        filter(contact => contact)
      )
      .subscribe((contact: Contact) => {
        // console.log(contact);
        this.transferForm.patchValue({
          contact: {
            name: contact.name,
            surname: contact.surname,
            iban: contact.iban
          }
        })
      });
  }

  doTransfer(fd: FormGroupDirective) {
    // console.log(this.transferForm.value);
    const tf: TransferForm = {
      name: this.contact.get('name')!.value,
      surname: this.contact.get('surname')!.value,
      iban: this.contact.get('iban')!.value,
      amount: this.transfer.get('amount')!.value,
      cardId: this.transfer.get('card')!.value
    }
    this.transferService.transfer(tf)
      .subscribe(ret => {
        if (ret) {
          // conferma utente...
          this.snackBar.open(
            this.translate.instant('transfer.transferDone'),
            undefined,
            {duration: 3000, panelClass: ['sb-success']}
          );
        } else {
          // TODO: gestire errore...
        }
        // pulizia form...
        fd.resetForm();
        this.transferForm.reset();
      })
  }

}
