import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResizableDirective} from "./directives/resizable.directive";
import {CustomCurrencyPipe} from "./pipes/custom-currency.pipe";
import {AbbreviatePipe} from "./pipes/abbreviate.pipe";

@NgModule({
  declarations: [
    ResizableDirective,
    AbbreviatePipe,
    CustomCurrencyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResizableDirective,
    AbbreviatePipe,
    CustomCurrencyPipe
  ]
})
export class SharedModule { }
