import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../auth.service";
import {catchError, mapTo, Observable, of, take} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.fetchUser().pipe(
      take(1),
      map(() => true),
      catchError(() => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );

  }

}
