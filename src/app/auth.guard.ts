import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthState } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(route.url[0]);
    let path: string = route.url[0].path;
    let auth_state = this.auth.getInfo().role;
    switch (path) {
      case 'dishes-manager':
        if (auth_state == AuthState.Admin || auth_state == AuthState.Manager) {
          return true;
        }
        this.router.navigate(['/account']);
        return false;

      case 'cart':
        if (auth_state != AuthState.Stranger) {
          return true;
        }
        this.router.navigate(['/account']);
        return false;

      case 'menu':
        if (auth_state != AuthState.Stranger) {
          return true;
        }
        this.router.navigate(['/account']);
        return false;

      case 'admin-view':
        if (auth_state == AuthState.Admin) {
          return true;
        }
        this.router.navigate(['/account']);
        return false;
    }
    return true;
  }
}
