import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementComponent } from './movement.component';
import {TranslateModule} from "@ngx-translate/core";
import {NgxMaskModule} from "ngx-mask";
import {MovementListItemComponent} from "./movement-list-item.component";
import {MaterialModule} from "../../shared/material/material.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: MovementComponent }
];

@NgModule({
  declarations: [
    MovementComponent,
    MovementListItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    NgxMaskModule,
    SharedModule,
    FormsModule
  ]
})
export class MovementModule { }
