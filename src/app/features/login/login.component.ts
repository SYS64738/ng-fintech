import {
  Component,
  OnInit,
} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Credentials, User} from "../../models/user";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ng-login',
  template: `
    <mat-card
      [class]="'mat-elevation-z9 mat-card-' + mode"
    >

      <mat-card-title class="mat-card-title">
        {{ 'login.' + mode | translate | titlecase }}
      </mat-card-title>

      <ng-signin *ngIf="mode === 'login'" (login)="login($event)"></ng-signin>
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
    this.authService.logIn(credential.email, credential.password)
      .subscribe((userId) => {
        console.log(`User ${userId} has logged in`);
        this.router.navigateByUrl('homepage');
      })
  }

  register(registration: User) {
    // console.log(registration);
    this.snackBar.open(
      this.translate.instant('login.userRegistered', {user: registration.name}),
      undefined,
      {duration: 3000, panelClass: ['sb-success']}
    );
    // torno al login...
    this.mode = 'login';
  }

}
