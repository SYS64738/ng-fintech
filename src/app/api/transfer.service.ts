import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Transfer} from "../models/transfer";

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  transfer(payload: Transfer): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/transfer`, payload);
  }

}
