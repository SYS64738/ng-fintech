import {Injectable} from "@angular/core";
import {Card, CardForm} from "../models/card";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {CardService} from "../api/card.service";

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

  insert(cardForm: CardForm): Observable<Card> {
    return this.cardService.insert(cardForm).pipe(
      tap(card => this._cards$.next([...this._cards$.getValue(), card]))
    );
  }

  delete(id: string): Observable<boolean> {
    return this.cardService.delete(id).pipe(
      tap(() => this._cards$.next(this._cards$.getValue().filter(c => c._id !== id)))
    )
  }

  alreadyExists(cardNumber: string): boolean {
    return this._cards$.getValue().findIndex(c => c.number === cardNumber) !== -1;
  }


}
