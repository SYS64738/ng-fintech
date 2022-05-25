import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {DayWithSlot, DayWithSlots, Location} from "../models/appointment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private translate: TranslateService) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.apiUrl}/locations`);
  }

  getLocationSlots(locationId: string): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(`${environment.apiUrl}/slots/${locationId}`);
  }

  schedule(dayWithSlot: DayWithSlot): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/schedule`, { ...dayWithSlot }).pipe(
      catchError(error => {
        this.showError('appointment.scheduleFailed', error.error.error);
        return of(false);
      })
    );
  }

  showError(errorId: string, detailMessage: any) {
    this.snackBar.open(
      this.translate.instant(errorId, {error: detailMessage}),
      undefined,
      {duration: 5000, panelClass: ['sb-error']}
    );
  }

}
