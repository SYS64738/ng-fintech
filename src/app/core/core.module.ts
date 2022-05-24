import {NgModule} from "@angular/core";
import {ThemesMenuComponent} from "./themes/themes-menu.component";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../shared/material/material.module";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiInterceptor} from "./api.interceptor";
import {AuthInterceptor} from "./auth.interceptor";

@NgModule({
  declarations: [
    ThemesMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  exports: [
    ThemesMenuComponent
  ]
})
export class CoreModule {}
