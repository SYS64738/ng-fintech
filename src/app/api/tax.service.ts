import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {f24} from "../models/tax";

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http: HttpClient) {}

  // TODO: la card e' attualmente inutilizzata...
  insert(card: string, f24: f24): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/taxes`, f24);
  }

}
