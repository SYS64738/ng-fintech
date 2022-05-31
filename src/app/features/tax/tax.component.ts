import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {FormArray, FormBuilder, NgForm, Validators} from "@angular/forms";
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  startWith,
  Subscription,
  switchMap,
  tap
} from "rxjs";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {insertF24, insertF24Success} from "../../store/tax/tax.actions";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {selectCards} from "../../store/card/card.selectors";
import {MatDialog} from "@angular/material/dialog";
import {SelectCardDialogComponent} from "./select-card-dialog.component";
import {getCards} from "../../store/card/card.actions";
import {map} from "rxjs/operators";
import {getCities} from "../../store/city/city.actions";
import {
  selectCities,
  selectFilteredCities,
  selectFilteredDistrict
} from "../../store/city/city.selectors";

@Component({
  selector: 'ng-tax',
  template: `

    <div resizable>
      <div class="container">

        <form [formGroup]="taxForm" #formDirective="ngForm" (ngSubmit)="saveF24()">

          <h2>{{ 'tax.taxPayer' | translate }}</h2>
          <ng-container formGroupName="taxPayer">
            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'tax.fiscalCode' | translate }}</mat-label>
              <input
                formControlName="fiscalCode"
                matInput
                autocomplete="off"
                placeholder="{{ 'tax.fiscalCode' | translate }}"
                mask="SSS SSS 00S00 S000 S"
                class="uppercase"
              >
              <mat-error>
                {{ 'tax.fiscalCodeRequired' | translate }}
              </mat-error>
            </mat-form-field>

            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'tax.surname' | translate }}</mat-label>
              <input
                formControlName="surname"
                matInput
                autocomplete="off"
                placeholder="{{ 'tax.surname' | translate }}"
              >
              <mat-error>
                {{ 'tax.surnameRequired' | translate }}
              </mat-error>
            </mat-form-field>

            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'tax.name' | translate }}</mat-label>
              <input
                formControlName="name"
                matInput
                autocomplete="off"
                placeholder="{{ 'tax.name' | translate }}"
              >
              <mat-error>
                {{ 'tax.nameRequired' | translate }}
              </mat-error>
            </mat-form-field>

            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'tax.birthDate' | translate }}</mat-label>
              <input
                matInput
                formControlName="birthDate"
                [matDatepicker]="pickerBD"
                [max]="currentDate"
              >
              <mat-datepicker-toggle matSuffix [for]="pickerBD"></mat-datepicker-toggle>
              <mat-datepicker #pickerBD></mat-datepicker>
              <mat-error>
                {{ 'tax.birthDateRequired' | translate }}
              </mat-error>
            </mat-form-field>

            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'tax.sex' | translate }}</mat-label>
              <mat-select formControlName="sex">
                <mat-option [value]="'M'">{{ 'tax.sex.M' | translate }}</mat-option>
                <mat-option [value]="'F'">{{ 'tax.sex.F' | translate }}</mat-option>
                <mat-option [value]="'O'">{{ 'tax.sex.O' | translate }}</mat-option>
              </mat-select>
              <mat-error>
                {{ 'tax.sexRequired' | translate }}
              </mat-error>
            </mat-form-field>

            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'tax.birthDistrict' | translate }}</mat-label>
              <input
                formControlName="birthDistrict"
                matInput
                autocomplete="off"
                placeholder="{{ 'tax.birthDistrict' | translate }}"
                [matAutocomplete]="autoDistrict"
              >
              <mat-autocomplete #autoDistrict="matAutocomplete" [displayWith]="displayFn">
                <cdk-virtual-scroll-viewport
                  itemSize="25"
                  [style.height.px]="districtViewPortHeight"
                >
                  <mat-option *cdkVirtualFor="let district of filteredDistricts$ | async" [value]="district">
                    {{ district }}
                  </mat-option>
                </cdk-virtual-scroll-viewport>
              </mat-autocomplete>
              <mat-error>
                {{ 'tax.birthDistrictRequired' | translate }}
              </mat-error>
            </mat-form-field>

            <mat-form-field class="mat-input-large" appearance="fill">
              <mat-label>{{ 'tax.birthCity' | translate }}</mat-label>
              <input
                formControlName="birthCity"
                matInput
                autocomplete="off"
                placeholder="{{ 'tax.birthCity' | translate }}"
                [matAutocomplete]="autoCity"
              >
              <mat-autocomplete #autoCity="matAutocomplete" [displayWith]="displayFn">
                <!-- sostituito con virtual scroll, per migliorare le performance...
                <mat-option *ngFor="let city of filteredCities | async" [value]="city">
                  {{ city.nome }}
                </mat-option>
                -->
                <cdk-virtual-scroll-viewport
                  itemSize="25"
                  [style.height.px]="cityViewPortHeight"
                >
                  <mat-option *cdkVirtualFor="let city of filteredCities$ | async" [value]="city">
                    {{ city }}
                  </mat-option>
                </cdk-virtual-scroll-viewport>
              </mat-autocomplete>
              <mat-error>
                {{ 'tax.birthCityRequired' | translate }}
              </mat-error>
            </mat-form-field>
          </ng-container>

          <h2>{{ 'tax.taxAuthority' | translate }}</h2>
          <div formArrayName="taxAuthorities">
            <div *ngFor="let tac of taxAuthorities.controls; let i = index" [formGroupName]="i" class="item">

              <mat-form-field appearance="fill" style="width: 12%">
                <mat-label>{{ 'tax.tributeCode' | translate }}</mat-label>
                <input
                  formControlName="tributeCode"
                  matInput
                  autocomplete="off"
                  placeholder="{{ 'tax.tributeCode' | translate }}"
                >
                <mat-error>
                  {{ 'tax.tributeCodeRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 12%">
                <mat-label>{{ 'tax.referenceYear' | translate }}</mat-label>
                <input
                  formControlName="referenceYear"
                  matInput
                  autocomplete="off"
                  mask="0000"
                  placeholder="{{ 'tax.referenceYear' | translate }}"
                >
                <mat-error>
                  {{ 'tax.referenceYearRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 35%">
                <mat-label>{{ 'tax.debit' | translate }}</mat-label>
                <input
                  formControlName="debit"
                  matInput
                  autocomplete="off"
                  placeholder="{{ 'tax.debit' | translate }}"
                  mask="separator.2"
                  prefix="{{ 'currency' | translate }} "
                  thousandSeparator="."
                  decimalMarker=","
                >
                <mat-error>
                  {{ 'tax.debitRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 35%">
                <mat-label>{{ 'tax.credit' | translate }}</mat-label>
                <input
                  formControlName="credit"
                  matInput
                  autocomplete="off"
                  placeholder="{{ 'tax.credit' | translate }}"
                  mask="separator.2"
                  prefix="{{ 'currency' | translate }} "
                  thousandSeparator="."
                  decimalMarker=","
                >
                <mat-error>
                  {{ 'tax.creditRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <button
                style="margin-bottom: 16px"
                mat-mini-fab
                color="warn"
                type="button"
                matTooltip="{{ 'tax.removeTT' | translate }}"
                (click)="removeAuthority(i)"
              >
                <mat-icon>delete</mat-icon>
              </button>

            </div>

            <div class="item-total" *ngIf="taxAuthorities.length > 0">
              <h3 style="width: 50%">{{ 'tax.totalTaxAuthorityDebit' | translate}}
                : {{ 'currency' | translate }} {{ totalTaxAuthorityDebit$ | async }}</h3>
              <h3 style="width: 50%">{{ 'tax.totalTaxAuthorityCredit' | translate}}
                : {{ 'currency' | translate }} {{ totalTaxAuthorityCredit$ | async }}</h3>
            </div>

            <button
              style="margin-top: 10px; margin-bottom: 16px"
              mat-mini-fab
              color="primary"
              type="button"
              matTooltip="{{ 'tax.addTT' | translate }}"
              (click)="appendAuthority()"
            >
              <mat-icon>add</mat-icon>
            </button>
          </div>

          <h2>{{ 'tax.inps' | translate }}</h2>
          <div formArrayName="inps">
            <div *ngFor="let ic of inps.controls; let i = index" [formGroupName]="i" class="item">

              <mat-form-field appearance="fill" style="width: 10%">
                <mat-label>{{ 'tax.officeCode' | translate }}</mat-label>
                <input
                  formControlName="officeCode"
                  matInput
                  autocomplete="off"
                  placeholder="{{ 'tax.officeCode' | translate }}"
                >
                <mat-error>
                  {{ 'tax.officeCodeRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 20%">
                <mat-label>{{ 'tax.reason' | translate }}</mat-label>
                <input
                  formControlName="reason"
                  matInput
                  autocomplete="off"
                  placeholder="{{ 'tax.reason' | translate }}"
                >
                <mat-error>
                  {{ 'tax.reasonRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 10%">
                <mat-label>{{ 'tax.inpsCode' | translate }}</mat-label>
                <input
                  formControlName="inpsCode"
                  matInput
                  autocomplete="off"
                  placeholder="{{ 'tax.inpsCode' | translate }}"
                >
                <mat-error>
                  {{ 'tax.inpsCodeRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 15%">
                <mat-label>{{ 'tax.fromDate' | translate }}</mat-label>
                <input
                  matInput
                  formControlName="from"
                  [matDatepicker]="pickerFrom"
                  [max]="currentDate"
                >
                <mat-datepicker-toggle matSuffix [for]="pickerFrom"></mat-datepicker-toggle>
                <mat-datepicker #pickerFrom></mat-datepicker>
                <mat-error>
                  {{ 'tax.fromDateRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 15%">
                <mat-label>{{ 'tax.toDate' | translate }}</mat-label>
                <input
                  matInput
                  formControlName="to"
                  [matDatepicker]="pickerTo"
                  [max]="currentDate"
                >
                <mat-datepicker-toggle matSuffix [for]="pickerTo"></mat-datepicker-toggle>
                <mat-datepicker #pickerTo></mat-datepicker>
                <mat-error>
                  {{ 'tax.toDateRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 10%">
                <mat-label>{{ 'tax.debit' | translate }}</mat-label>
                <input
                  formControlName="debit"
                  matInput
                  autocomplete="off"
                  placeholder="{{ 'tax.debit' | translate }}"
                  mask="separator.2"
                  prefix="{{ 'currency' | translate }} "
                  thousandSeparator="."
                  decimalMarker=","
                >
                <mat-error>
                  {{ 'tax.debitRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" style="width: 10%">
                <mat-label>{{ 'tax.credit' | translate }}</mat-label>
                <input
                  formControlName="credit"
                  matInput
                  autocomplete="off"
                  placeholder="{{ 'tax.credit' | translate }}"
                  mask="separator.2"
                  prefix="{{ 'currency' | translate }} "
                  thousandSeparator="."
                  decimalMarker=","
                >
                <mat-error>
                  {{ 'tax.creditRequired' | translate }}
                </mat-error>
              </mat-form-field>

              <button
                style="margin-bottom: 16px"
                mat-mini-fab
                color="warn"
                type="button"
                matTooltip="{{ 'tax.removeTT' | translate }}"
                (click)="removeInps(i)"
              >
                <mat-icon>delete</mat-icon>
              </button>

            </div>

            <div class="item-total" *ngIf="inps.length > 0">
              <h3 style="width: 50%">{{ 'tax.totalInpsDebit' | translate}}
                : {{ 'currency' | translate }} {{ totalInpsDebit$ | async }}</h3>
              <h3 style="width: 50%">{{ 'tax.totalInpsCredit' | translate}}
                : {{ 'currency' | translate }} {{ totalInpsCredit$ | async }}</h3>
            </div>

            <button
              style="margin-top: 10px; margin-bottom: 16px"
              mat-mini-fab
              color="primary"
              type="button"
              matTooltip="{{ 'tax.addTT' | translate }}"
              (click)="appendInps()"
            >
              <mat-icon>add</mat-icon>
            </button>
          </div>

          <h3>{{ 'tax.grandTotal' | translate}}: {{ 'currency' | translate }} {{ grandTotal$ | async }}</h3>

          <button
            mat-raised-button
            class="button"
            color="primary"
            [disabled]="!taxForm.valid || taxAuthorities.length === 0 || inps.length === 0"
          >{{ 'tax.send' | translate }}
          </button>

        </form>

        <!--
        {{ taxForm.value | json }}
        -->

      </div>
    </div>

  `,
  styles: [`

    .container {
      width: 90%;
      margin: 0 auto;
      overflow: auto;
    }

    .mat-input-large {
      width: 100%;
      padding-bottom: 10px;
    }

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .item-total {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .button {
      width: 100%;
    }

  `]
})
export class TaxComponent implements OnInit, OnDestroy {

  @ViewChild('formDirective') fd!: NgForm;

  cards$ = this.store.select(selectCards);
  cities$ = this.store.select(selectCities);
  filteredCities$: Observable<string[]> | null = null;
  filteredDistricts$: Observable<string[]> | null = null;
  cityViewPortHeight: number = 200;
  districtViewPortHeight: number = 200;

  actionsSubscriptions = new Subscription();
  currentDate = new Date();
  currentYear: number = this.currentDate.getFullYear();

  taxForm = this.fb.group({
    taxPayer: this.fb.group({
      fiscalCode: ['', Validators.required],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      birthDate: [null, Validators.required],
      sex: ['', Validators.required],
      birthDistrict: ['', Validators.required],
      birthCity: ['', Validators.required],
    }),
    taxAuthorities: this.fb.array([]),
    inps: this.fb.array([])
  });

  totalTaxAuthorityDebit$ = this.taxForm.valueChanges.pipe(
    map(form => this.computeFieldTotal(form.taxAuthorities, 'debit')),
    startWith(0)
  )
  totalTaxAuthorityCredit$ = this.taxForm.valueChanges.pipe(
    map(form => this.computeFieldTotal(form.taxAuthorities, 'credit')),
    startWith(0)
  )
  totalInpsDebit$ = this.taxForm.valueChanges.pipe(
    map(form => this.computeFieldTotal(form.inps, 'debit')),
    startWith(0)
  )
  totalInpsCredit$ = this.taxForm.valueChanges.pipe(
    map(form => this.computeFieldTotal(form.inps, 'credit')),
    startWith(0)
  )
  grandTotal$ = combineLatest([
    this.totalTaxAuthorityCredit$,
    this.totalTaxAuthorityDebit$,
    this.totalInpsCredit$,
    this.totalInpsDebit$
  ]).pipe(
    map(([a, b, c, d]) => a - b + c - d),
    startWith(0)
  )

  get taxPayer() {
    return this.taxForm.get('taxPayer');
  }

  get taxAuthorities() {
    return this.taxForm.get('taxAuthorities') as FormArray;
  }

  get inps() {
    return this.taxForm.get('inps') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private store: Store,
              private actionListener$: Actions,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private translate: TranslateService) {}

  ngOnInit(): void {
    this.store.dispatch(getCards());
    this.store.dispatch(getCities());
    this.addInsertF24Hook();
    // TODO: gestire filtro reciproco con provincia (cfr. selector)...
    this.filteredDistricts$ = this.taxPayer!.get('birthDistrict')!.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(filter => this.store.select(selectFilteredDistrict(filter)).pipe(
        tap(items => {
          // this.taxPayer!.get('birthCity')!.reset('');
          if (items.length < 4) {
            this.districtViewPortHeight = (items.length * 50);
          } else {
            this.districtViewPortHeight = 200;
          }
        })
      ))
    );
    this.filteredCities$ = this.taxPayer!.get('birthCity')!.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(filter => this.store.select(selectFilteredCities(filter)).pipe(
        tap(items => {
          if (items.length < 4) {
            this.cityViewPortHeight = (items.length * 50);
          } else {
            this.cityViewPortHeight = 200;
          }
        })
      ))
    );
  }

  ngOnDestroy() {
    this.actionsSubscriptions.unsubscribe();
  }

  displayFn = (value: string) => value;

  addInsertF24Hook() {
    this.actionsSubscriptions.add(
      this.actionListener$.pipe(
        ofType(insertF24Success),
      ).subscribe(() => {
        // conferma utente...
        this.snackBar.open(
          this.translate.instant('tax.insertDone'),
          undefined,
          {duration: 3000, panelClass: ['sb-success']}
        );
        // pulizia form...
        this.taxAuthorities.clear();
        this.inps.clear();
        this.fd.resetForm();
        this.taxForm.reset();
      })
    );
  }

  buildAuthority() {
    return this.fb.group({
      tributeCode: ['', Validators.required],
      referenceYear: [this.currentYear,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.min(1990),
          Validators.max(this.currentYear)
        ]
      ],
      debit: [0, Validators.required],
      credit: [0, Validators.required]
    })
  }

  appendAuthority() {
    this.taxAuthorities.push(this.buildAuthority());
  }

  removeAuthority(i: number) {
    this.taxAuthorities.removeAt(i);
  }

  buildInps() {
    return this.fb.group({
      officeCode: ['', Validators.required],
      reason: ['', Validators.required],
      inpsCode: ['', Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      debit: [0, Validators.required],
      credit: [0, Validators.required]
    })
  }

  appendInps() {
    this.inps.push(this.buildInps());
  }

  removeInps(i: number) {
    this.inps.removeAt(i);
  }

  computeFieldTotal(items: any[], field: string): number {
    return items.reduce((total, item) => total + item[field], 0);
  }

  saveF24() {
    const dialogRef = this.dialog.open(SelectCardDialogComponent, {
      width: '500px',
      data: {
        cards$: this.cards$
      }
    });
    dialogRef.afterClosed().pipe(
      filter(card => card !== undefined)
    ).subscribe((card) =>
      this.store.dispatch(insertF24({ card, model: this.taxForm.value }))
    )
  }

}
