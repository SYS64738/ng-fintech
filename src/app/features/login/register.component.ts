import {Component, EventEmitter, Output} from "@angular/core";
import {Credentials} from "../../models/user";

@Component({
  selector: 'ng-register',
  template: `

    <form
      #f="ngForm"
      ngEqualFields [equalFields]="['password', 'repeatPassword']"
      (ngSubmit)="register.emit(f.value)"
    >
      <mat-form-field class="mat-input-login" appearance="fill">
        <mat-icon matPrefix class="mat-icon-prefix" color="primary">person</mat-icon>
        <mat-label>{{ 'login.email' | translate }}</mat-label>
        <input
          matInput
          autocomplete="off"
          ngModel name="email"
          type="email"
          #emailRef="ngModel"
          placeholder="{{ 'login.email' | translate }}"
          required
          email
        >
        <mat-error *ngIf="emailRef.hasError('required') && f.dirty">
          {{ 'login.emailRequired' | translate }}
        </mat-error>
        <mat-error *ngIf="emailRef.hasError('email') && f.dirty">
          {{ 'login.emailInvalid' | translate }}
        </mat-error>
      </mat-form-field>

      <mat-form-field class="mat-input-login" appearance="fill">
        <mat-icon matPrefix class="mat-icon-prefix" color="primary">person</mat-icon>
        <mat-label>{{ 'login.name' | translate }}</mat-label>
        <input
          matInput
          autocomplete="off"
          ngModel name="name"
          #nameRef="ngModel"
          placeholder="{{ 'login.name' | translate }}"
          required
        >
        <mat-error *ngIf="nameRef.hasError('required') && f.dirty">
          {{ 'login.nameRequired' | translate }}
        </mat-error>
      </mat-form-field>

      <mat-form-field class="mat-input-login" appearance="fill">
        <mat-icon matPrefix class="mat-icon-prefix" color="primary">person</mat-icon>
        <mat-label>{{ 'login.surname' | translate }}</mat-label>
        <input
          matInput
          autocomplete="off"
          ngModel name="surname"
          #surnameRef="ngModel"
          placeholder="{{ 'login.surname' | translate }}"
          required
        >
        <mat-error *ngIf="surnameRef.hasError('required') && f.dirty">
          {{ 'login.surnameRequired' | translate }}
        </mat-error>
      </mat-form-field>

      <!--
      <div ngModelGroup="pwg" #pwg="ngModelGroup" ngEqualFields [equalFields]="['password', 'repeatPassword']">
      -->

      <mat-form-field class="mat-input-login" appearance="fill">
        <mat-icon matPrefix class="mat-icon-prefix" color="primary">vpn_key</mat-icon>
        <mat-label>{{ 'login.password' | translate }}</mat-label>
        <input
          matInput
          autocomplete="off"
          [type]="showPassword ? 'text' : 'password'"
          ngModel name="password"
          #passwordRef="ngModel"
          placeholder="{{ 'login.password' | translate }}"
          required
        >
        <mat-icon
          matSuffix
          class="mat-icon-suffix"
          (click)="showPassword = !showPassword"
        >
          {{ 'visibility' + (!showPassword ? '_off' : '') }}
        </mat-icon>
        <mat-error *ngIf="passwordRef.hasError('required') && f.dirty">
          {{ 'login.passwordRequired' | translate }}
        </mat-error>
      </mat-form-field>

      <mat-form-field class="mat-input-login" appearance="fill">
        <mat-icon matPrefix class="mat-icon-prefix" color="primary">vpn_key</mat-icon>
        <mat-label>{{ 'login.repeatPassword' | translate }}</mat-label>
        <input
          matInput
          autocomplete="off"
          [type]="showPassword ? 'text' : 'password'"
          ngModel name="repeatPassword"
          #repeatPasswordRef="ngModel"
          placeholder="{{ 'login.repeatPassword' | translate }}"
          required
          [disabled]="!passwordRef.dirty"
        >
        <mat-icon
          matSuffix
          class="mat-icon-suffix"
          (click)="showPassword = !showPassword"
        >
          {{ 'visibility' + (!showPassword ? '_off' : '') }}
        </mat-icon>
        <mat-error *ngIf="repeatPasswordRef.hasError('required') && f.dirty">
          {{ 'login.passwordRequired' | translate }}
        </mat-error>
      </mat-form-field>

      <mat-error
        *ngIf="f.hasError('equalFields') && f.dirty"
        style="margin-bottom: 10px; font-size: small"
      >
        {{ 'login.passwordNotCorresponding' | translate }}
      </mat-error>

      <!--
      </div>
      -->

      <button
        class="button-login"
        mat-raised-button type="submit"
        color="primary"
        [disabled]="!f.valid">
        {{ 'confirm' | translate }}
      </button>

    </form>

  `,
  styles: [`

    .mat-icon-prefix {
      padding-right: 10px;
    }

    .mat-icon-suffix {
      padding-left: 10px;
      cursor: pointer;
    }

    .mat-input-login {
      width: 90%;
      padding-bottom: 10px;
    }

    .button-login {
      margin-top: 10px;
      width: 90%;
    }

  `],
})
export class RegisterComponent {

  @Output() register = new EventEmitter<Credentials>();
  showPassword: boolean = false;

}
