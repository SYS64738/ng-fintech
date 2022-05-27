import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Card, CardForm} from "../models/card";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Movement, MovementList} from "../models/movement";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  list(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}/cards`);
  }

  listMovements(cardId: string, limit?: number, offset?: number): Observable<MovementList> {
    return this.http.get<MovementList>(`${environment.apiUrl}/cards/${cardId}/movements`
      + (limit ? `?limit=${limit}` : '')
      + (offset ? `&offset=${offset}` : ''));
  }

  insert(card: CardForm): Observable<Card> {
    return this.http.post<Card>(`${environment.apiUrl}/cards`, card);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/cards/${id}`);
  }

}
