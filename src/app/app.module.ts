import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "./shared/material/material.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CoreModule} from "./core/core.module";
import {NgxMaskModule} from "ngx-mask";
import {CommonErrorHandler} from "./shared/common-error-handler";
import {MetaReducer, StoreModule} from "@ngrx/store";
import {cardsReducer} from "./store/card/card.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {CardEffects} from "./store/card/card.effects";
import {movementsReducer} from "./store/movement/movement.reducer";
import {MovementEffects} from "./store/movement/movement.effects";
import {contactsReducer} from "./store/contact/contact.reducer";
import {ContactEffects} from "./store/contact/contact.effects";
import {TransferEffects} from "./store/transfer/transfer.effects";
import {transferReducer} from "./store/transfer/transfer.reducer";
import {AppointmentEffects} from "./store/appointment/appointment.effects";
import {appointmentReducer} from "./store/appointment/appointment.reducer";

/*
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['todos'],
    rehydrate: true,
  })(reducer);
}
*/
const metaReducers: Array<MetaReducer<any, any>> = []; // [localStorageSyncReducer];

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
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient: HttpClient) => (new TranslateHttpLoader(httpClient, 'assets/i18n/')),
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(),
    StoreModule.forRoot({
      cards: cardsReducer,
      movements: movementsReducer,
      contacts: contactsReducer,
      transfers: transferReducer,
      appointments: appointmentReducer
    }, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([
      CardEffects,
      MovementEffects,
      ContactEffects,
      TransferEffects,
      AppointmentEffects
    ])
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
