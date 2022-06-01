import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResizableDirective} from "./directives/resizable.directive";
import {CustomCurrencyPipe} from "./pipes/custom-currency.pipe";
import {AbbreviatePipe} from "./pipes/abbreviate.pipe";
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import {MaterialModule} from "./material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {LeafletComponent} from "./components/leaflet.component";
import {EqualFieldsValidator} from "./validators/equal-fields.validator";
import {DateRangeValidator} from "./validators/date-range.validator";

@NgModule({
  declarations: [
    ResizableDirective,
    AbbreviatePipe,
    CustomCurrencyPipe,
    ConfirmDialogComponent,
    LeafletComponent,
    EqualFieldsValidator,
    DateRangeValidator
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild(),
  ],
  exports: [
    ResizableDirective,
    AbbreviatePipe,
    CustomCurrencyPipe,
    ConfirmDialogComponent,
    LeafletComponent,
    EqualFieldsValidator,
    DateRangeValidator
  ]
})
export class SharedModule { }
