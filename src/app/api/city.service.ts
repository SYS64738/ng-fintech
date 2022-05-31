import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Comune} from "../models/city";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private  http: HttpClient) {}

  list(): Observable<Comune[]> {
    return this.http.get<Comune[]>("assets/comuni/comuni.json");
  }

}
