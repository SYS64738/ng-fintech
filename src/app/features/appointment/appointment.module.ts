import {NgModule, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {RouterModule, Routes} from "@angular/router";
import {AppointmentComponent} from "./appointment.component";
import {LocationListItemComponent} from "./location-list-item.component";
import {LocationListComponent} from "./location-list.component";
import {AppointmentFormComponent} from "./appointment-form.component";
import {FormsModule} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {Subscription} from "rxjs";
import {SlotListComponent} from "./slot-list.component";

const routes: Routes = [
    {
      path: '',
      component: AppointmentComponent
    }
  ]
;

@NgModule({
  declarations: [
    AppointmentComponent,
    AppointmentFormComponent,
    LocationListComponent,
    LocationListItemComponent,
    SlotListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  providers: []
})
export class AppointmentModule implements OnDestroy {

  onLangChange: Subscription | null = null;

  constructor(private dateAdapter: DateAdapter<any>,
              private translate: TranslateService) {
    this.dateAdapter.setLocale(this.translate.currentLang);
    this.onLangChange = this.translate.onLangChange
      .subscribe(() => this.dateAdapter.setLocale(this.translate.currentLang));
  }

  ngOnDestroy(): void {
    if (this.onLangChange) {
      this.onLangChange.unsubscribe();
    }
  }

}
