import {Component, OnInit} from '@angular/core';
import {UserStore} from "../../store/user.store";
import {count, take, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {selectCards} from "../../store/card/card.selectors";
import {getCards} from "../../store/card/card.actions";
import {map} from "rxjs/operators";
import {MaskPipe} from "ngx-mask";


@Component({
  selector: 'ng-homepage',
  template: `
    <div resizable>
      <h1 class="mat-h1">{{ 'welcome' | translate: { user } }}</h1>
      <div style="margin-top: 100px">
        <ng-highcharts
          type="column"
          title="{{ 'homepage.cards' | translate }}"
          seriesName="{{ 'homepage.amount' | translate }}"
          [data]="(amount$ | async) ?? []"
          [categories]="(cards$ | async) ?? []"
        ></ng-highcharts>
      </div>
    </div>
  `,
  providers: [
    MaskPipe
  ]
})
export class HomepageComponent implements OnInit {

  user: string | null = null;
  cards$ = this.store.select(selectCards).pipe(
    map(cards => cards.map(c => this.maskPipe.transform(c.number, '0000 0000 0000 0000') + ` - ${c.surname} ${c.name}`)),
  );
  amount$ = this.store.select(selectCards).pipe(
    map(cards => cards.map(c => c.amount))
  );

  constructor(private store: Store,
              private userStore: UserStore,
              private maskPipe: MaskPipe) {
    userStore.user$.pipe(
      take(1)
    ).subscribe(u => this.user = u!.displayName);
  }

  ngOnInit() {
    this.store.dispatch(getCards())
  }

}
