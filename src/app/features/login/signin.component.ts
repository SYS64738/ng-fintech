import {Component, EventEmitter, Output} from "@angular/core";
import {Credentials} from "../../models/user";

@Component({
  selector: 'ng-signin',
  template: `

    <form #f="ngForm" (ngSubmit)="login.emit(f.value)">

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

      <button
        class="button-login"
        mat-raised-button type="submit"
        color="primary"
        [disabled]="!f.valid">
        {{ 'login.login' | translate }}
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
export class SignInComponent {

  @Output() login = new EventEmitter<Credentials>();

  showPassword: boolean = false;

}
