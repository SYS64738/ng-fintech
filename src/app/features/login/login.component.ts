import {
  AfterViewInit,
  Component,
  OnInit, ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Credentials, User} from "../../models/user";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../core/auth.service";
import {SignInComponent} from "./signin.component";

@Component({
  selector: 'ng-login',
  template: `
    <mat-card
      [class]="'mat-elevation-z9 mat-card-' + mode"
    >

      <mat-card-title class="mat-card-title">
        {{ 'login.' + mode | translate | titlecase }}
      </mat-card-title>

      <ng-signin *ngIf="mode === 'login'" (login)="login($event)" #signIn></ng-signin>
      <ng-register *ngIf="mode === 'register'" (register)="register($event)"></ng-register>

      <a href="#" (click)="toggleMode($event)">{{ 'login.' + mode + 'Link' | translate }}</a>

    </mat-card>
  `,
  styles: [`

    mat-card {
      margin-left: 100px;
      margin-top: 50px;
      position: fixed;
      width: 400px;
      text-align: center;
    }

    .mat-card-login {
      height: 320px;
    }

    .mat-card-register {
      height: 600px;
    }

    .mat-card-title {
      text-align: center;
      margin-bottom: 20px;
    }

    a {
      position: absolute;
      left: 35px;
      margin-top: 5px;
      color: var(--primarycolor)
    }

  `],
})
export class LoginComponent implements OnInit {

  @ViewChild(SignInComponent) signIn: SignInComponent | null = null;

  mode: 'login' | 'register' = 'login';

  constructor(private authService: AuthService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    // ripristino il wallpaper...
    window.document.body.classList.add('bg-img');
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.mode === 'login' ? this.mode = 'register' : this.mode = 'login';
  }

  login(credential: Credentials) {
    // console.log(credential);
    this.authService.login(credential.email, credential.password)
      .subscribe((result) => {
        // console.log(result);
        if (result) {
          console.log(`User ${credential.email} has logged in`);
          window.document.body.classList.remove('bg-img');
          this.router.navigateByUrl('homepage');
        } else {
          this.snackBar.open(
            this.translate.instant('login.failed'),
            undefined,
            {duration: 3000, panelClass: ['sb-error']}
          );
          this.signIn!.cleanUp();
        }
      })
  }

  register(credentials: Credentials) {
    // console.log(registration);
    this.authService.register(credentials)
      .subscribe((result) => {
        if (result) {
          this.snackBar.open(
            this.translate.instant('login.userRegistered', {user: `${credentials.name} ${credentials.surname}`}),
            undefined,
            {duration: 3000, panelClass: ['sb-success']}
          );
          // torno al login...
          this.mode = 'login';
        }
      })
  }

}
