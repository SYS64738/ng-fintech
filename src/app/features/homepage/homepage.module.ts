import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    TranslateModule.forChild(),
    SharedModule
  ]
})
export class HomepageModule { }
