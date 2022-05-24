import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../auth.service";
import {catchError, mapTo, Observable, of, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.fetchUser().pipe(
      take(1),
      mapTo(true),
      catchError(() => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );

    /*
    if (this.auth.isUserLogged()) {
      // se loggato, rimuovo lo sfondo dal body...
      window.document.body.classList.remove('bg-img');
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
    */
  }

}
