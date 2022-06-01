import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {filter, Subscription} from "rxjs";
import {ContactComponent} from "./contact/contact.component";
import {Contact} from "../../models/contact";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {Transfer} from "../../models/transfer";
import {TransferValidator} from "./validators/transfer.validator";
import {Store} from "@ngrx/store";
import {selectCards} from "../../store/card/card.selectors";
import {Actions, ofType} from "@ngrx/effects";
import {insertTransfer, insertTransferSuccess} from "../../store/transfer/transfer.actions";
import {getCards} from "../../store/card/card.actions";

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

        <form [formGroup]="transferForm" #formDirective="ngForm" (ngSubmit)="doTransfer()">

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
                decimalMarker=","
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
                  *ngFor="let card of cards$ | async"
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
export class TransferComponent implements OnInit, OnDestroy {

  @ViewChild('formDirective') fd!: NgForm;

  cards$ = this.store.select(selectCards);
  actionsSubscriptions = new Subscription();

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

  get contact(): FormGroup {
    return this.transferForm.get('contact') as FormGroup;
  }

  get transfer(): FormGroup {
    return this.transferForm.get('transfer') as FormGroup;
  }

  constructor(public store: Store,
              private fb: FormBuilder,
              private actionListener$: Actions,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private transferValidator: TransferValidator) {}

  ngOnInit(): void {
    this.store.dispatch(getCards());
    this.addInsertTransferHook();
  }

  ngOnDestroy() {
    this.actionsSubscriptions.unsubscribe();
  }

  addInsertTransferHook() {
    this.actionsSubscriptions.add(
      this.actionListener$.pipe(
        ofType(insertTransferSuccess),
      ).subscribe(() => {
        // conferma utente...
        this.snackBar.open(
          this.translate.instant('transfer.transferDone'),
          undefined,
          {duration: 3000, panelClass: ['sb-success']}
        );
        // pulizia form...
        this.fd.resetForm();
        this.transferForm.reset();
      })
    );
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

  doTransfer() {
    const tf: Transfer = {
      name: this.contact.get('name')!.value,
      surname: this.contact.get('surname')!.value,
      iban: this.contact.get('iban')!.value,
      amount: this.transfer.get('amount')!.value,
      cardId: this.transfer.get('card')!.value
    }
    this.store.dispatch(insertTransfer({transfer: tf}));
  }

}
