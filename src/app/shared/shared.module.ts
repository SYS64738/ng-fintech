import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResizableDirective} from "./directives/resizable.directive";
import {CustomCurrencyPipe} from "./pipes/custom-currency.pipe";
import {AbbreviatePipe} from "./pipes/abbreviate.pipe";
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import {MaterialModule} from "./material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {LeafletComponent} from "./components/leaflet.component";

@NgModule({
  declarations: [
    ResizableDirective,
    AbbreviatePipe,
    CustomCurrencyPipe,
    ConfirmDialogComponent,
    LeafletComponent
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
    LeafletComponent
  ]
})
export class SharedModule { }
