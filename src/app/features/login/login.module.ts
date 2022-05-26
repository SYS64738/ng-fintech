import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../../shared/material/material.module";
import {FormsModule} from "@angular/forms";
import {SignInComponent} from "./signin.component";
import {RegisterComponent} from "./register.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: LoginComponent
  }
];

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
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    SharedModule,
  ]
})
export class LoginModule { }
