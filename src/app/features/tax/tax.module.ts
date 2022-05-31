import {NgModule, OnDestroy} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material/material.module";
import {NgxMaskModule} from "ngx-mask";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {DateAdapter} from "@angular/material/core";
import {TaxComponent} from "./tax.component";
import {SelectCardDialogComponent} from "./select-card-dialog.component";
import {CdkVirtualScrollViewport, ScrollingModule} from "@angular/cdk/scrolling";

const routes: Routes = [
  {
    path: '',
    component: TaxComponent
  }
];

@NgModule({
  declarations: [
    SelectCardDialogComponent,
    TaxComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ScrollingModule,
    SharedModule,
    TranslateModule.forChild(),
  ]
})
export class TaxModule implements OnDestroy {

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
