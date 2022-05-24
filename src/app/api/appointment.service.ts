import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DayWithSlots, Location} from "../models/appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.apiUrl}/locations`);
  }

  getLocationSlots(locationId: string): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(`${environment.apiUrl}/slots/${locationId}`);
  }

}
