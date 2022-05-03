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
export class HomepageComponent implements OnInit {

  heightPate: number | null = null;
  offset = 115;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.heightPate = window.innerHeight - this.offset;
    console.log('init', this.heightPate);
  }

  onResize(event: any) {
    this.heightPate = event.target.innerHeight - this.offset;
    console.log('resize', this.heightPate);
  }

}
