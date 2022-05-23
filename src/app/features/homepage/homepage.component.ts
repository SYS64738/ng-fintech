import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'ng-homepage',
  template: `
    <div resizable>
      <h1 class="mat-h1">{{ 'welcome' | translate: {user: authService.userName} }}</h1>
    </div>
  `
})
export class HomepageComponent {

  constructor(public authService: AuthService) { }

}
