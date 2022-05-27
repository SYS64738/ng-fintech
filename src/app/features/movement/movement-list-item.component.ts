import {Component, Input, OnInit} from '@angular/core';
import {MovementType} from "../../models/movement";
import {TranslateService} from "@ngx-translate/core";
import {MaskPipe} from "ngx-mask";

@Component({
  selector: 'ng-movementlistitem',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-description>
          <h6>[{{referenceDate}}]</h6>
          <h5
            class="amount"
            [ngClass]="{'in': type === 'in', 'out': type === 'out'}"
          >
            {{ 'currency' | translate}} {{ amount | customCurrency : translate.currentLang }}
          </h5>
          <h5>{{ parseIBAN(title) }}</h5>
        </mat-panel-description>
        <mat-panel-description *ngIf="description">
          {{ description | abbreviate: 20 }}
        </mat-panel-description>
      </mat-expansion-panel-header>
      <p>
          {{ description }}
      </p>
    </mat-expansion-panel>
  `,
  styles: [`

    h6 {
      color: gray;
      font-style: italic;
      margin-right: 10px;
    }

    h5 {
      margin-right: 10px;
    }

    .amount {
      margin-right: 10px;
      min-width: 80px;
      text-align: right;
    }

    .in {
      color: forestgreen;
    }

    .out {
      color: red;
    }

    mat-expansion-panel {
      margin-bottom: 10px;
    }

    .mat-expansion-panel-header-description {
      align-items: center;
      max-width: 50%;
    }

  `],
  providers: [
    MaskPipe
  ]
})
export class MovementListItemComponent {

  @Input() referenceDate: string | null = null;
  @Input() type: MovementType | null = null;
  @Input() amount: number | null = null;
  @Input() title: string | null = null;
  @Input() description: string | null = null;

  constructor(public translate: TranslateService,
              private maskPipe: MaskPipe) { }

  parseIBAN(title: string | null): string | null {
    let t = title;
    if (title && title.includes('[') && title.includes(']')) {
      // @ts-ignore
      t = title.split('[').pop().split(']')[0];
      t = title.replace(t, this.maskPipe.transform(t, 'SS00 S000 0000 0000 0000 0000 000').toUpperCase());
    }
    return t;
  }

}
