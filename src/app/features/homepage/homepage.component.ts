import { Component, OnInit } from '@angular/core';
import {UserStore} from "../../core/user.store";
import {take} from "rxjs";

@Component({
  selector: 'ng-homepage',
  template: `
    <div resizable>
      <h1 class="mat-h1">{{ 'welcome' | translate: { user } }}</h1>
    </div>
  `
})
export class HomepageComponent {

  user: string | null = null;

  constructor(private userStore: UserStore) {
    userStore.user$.pipe(
      take(1)
    ).subscribe(u => this.user = u!.displayName);
  }

}
