import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRoutingModule } from './card-routing.module';
import { CardListComponent } from './card-list.component';
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";
import {CardListItemComponent} from "./card-list-item.component";
import {TranslateModule} from "@ngx-translate/core";
import {CardComponent} from "./card.component";
import {CardFormComponent} from "./card-form.component";
import {FormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    CardListItemComponent,
    CardFormComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    TranslateModule.forChild(),
    NgxMaskModule
  ]
})
export class CardModule { }
