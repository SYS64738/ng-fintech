import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxMaskModule} from "ngx-mask";
import {RouterModule, Routes} from "@angular/router";
import {ContactListComponent} from "./contact/contact-list.component";
import {ContactComponent} from "./contact/contact.component";
import {ContactListFilterPipe} from "./contact/contact-list-filter.pipe";
import {ContactFormComponent} from "./contact/contact-form.component";
import {ContactListSortPipe} from "./contact/contact-list-sort.pipe";

const routes: Routes = [
  {
    path: '',
    component: TransferComponent
  }
];

@NgModule({
  declarations: [
    ContactComponent,
    ContactFormComponent,
    ContactListComponent,
    ContactListFilterPipe,
    ContactListSortPipe,
    TransferComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxMaskModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule.forChild(),
  ]
})
export class TransferModule { }
