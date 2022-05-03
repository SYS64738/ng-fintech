import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isUserLogged()) {
      // se loggato, rimuovo lo sfondo dal body...
      window.document.body.classList.remove('bg-img');
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

}
