import {Injectable} from "@angular/core";
import {Card, CardForm} from "../models/card";
import {BehaviorSubject, filter, Observable, of, share, shareReplay, Subject, switchMap, take} from "rxjs";
import {CardService} from "../api/card.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CardStore {

  private _cards$ = new BehaviorSubject<Card[]>( []);
  card$ = this._cards$.asObservable();

  constructor(private cardService: CardService) {}

  list() {
    this.cardService.list()
      .subscribe(cards => {
        this._cards$.next(cards);
      });
  }

  /*
  insert(cardForm: CardForm): Subject<Card> {
    const done = new Subject<null>();
    this.cardService.insert(cardForm);
  }
  */

  alreadyExists(cardNumber: string): boolean {
    return this._cards$.getValue().findIndex(c => c.number === cardNumber) !== -1;
  }



}
