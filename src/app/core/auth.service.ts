import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Credentials, User} from "../models/user";
import {catchError, Observable, of, switchMap, take, tap} from "rxjs";
import {UserStore} from "./user.store";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private userStore: UserStore,
              private router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.http.get<void>(`${environment.apiUrl}/csrf-token`).subscribe();
  }

  register(credentials: Credentials): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/register`, credentials).pipe(
      catchError((error) => {
        this.showError('login.registrationFailed', error.error.error);
        return of(false);
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/login`, {email, password}).pipe(
      switchMap(() => this.fetchUser()),
      map(() => true),
      catchError(() => of(false))
    )
  }

  logout(): void {
    this.http.get<any>(`${environment.apiUrl}/logout`).subscribe(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/login');
    });
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.http.get<any>(`${environment.apiUrl}/me`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          );
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
