import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "./shared/material/material.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CoreModule} from "./core/core.module";
import {NgxMaskModule} from "ngx-mask";
import {CommonErrorHandler} from "./shared/common-error-handler";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient: HttpClient) => (new TranslateHttpLoader(httpClient, 'assets/i18n/')),
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CommonErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
