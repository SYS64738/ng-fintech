import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResizableDirective} from "./directives/resizable.directive";
import {CustomCurrencyPipe} from "./pipes/custom-currency.pipe";
import {AbbreviatePipe} from "./pipes/abbreviate.pipe";
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import {MaterialModule} from "./material/material.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ResizableDirective,
    AbbreviatePipe,
    CustomCurrencyPipe,
    ConfirmDialogComponent
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
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
