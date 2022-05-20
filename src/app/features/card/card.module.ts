import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list.component';
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";
import {CardListItemComponent} from "./card-list-item.component";
import {TranslateModule} from "@ngx-translate/core";
import {CardComponent} from "./card.component";
import {CardFormComponent} from "./card-form.component";
import {FormsModule} from "@angular/forms";
import {MaskPipe, NgxMaskModule} from "ngx-mask";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {
      path: '',
      component: CardComponent
    }
  ]
;

@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    CardListItemComponent,
    CardFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    NgxMaskModule
  ],
  providers: [
    MaskPipe
  ]
})
export class CardModule { }
