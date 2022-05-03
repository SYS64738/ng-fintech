import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../../shared/material/material.module";
import {FormsModule} from "@angular/forms";
import {SignInComponent} from "./signin.component";
import {RegisterComponent} from "./register.component";

@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    LoginRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class LoginModule { }
