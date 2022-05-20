import {Injectable} from "@angular/core";
import {Card} from "../models/card";
import {BehaviorSubject} from "rxjs";
import {CardService} from "../api/card.service";

@Injectable({
  providedIn: 'root'
})
export class CardStore {

  private _cards$ = new BehaviorSubject<Card[]>( []);
  card$ = this._cards$.asObservable();

  constructor(private cardService: CardService) {}

  init() {
    this.cardService.list()
      .subscribe(cards => {
        this._cards$.next(cards);
      });
  }

}
