import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    /* if (this.authService.getAuth.id) return true;
    console.log('bloqueado por canActivate');
    return false; */
    return this.authService.isAuthenticated().pipe(
      tap( isAuthenticated => {
            if( !isAuthenticated ) {
              this.router.navigate(['./auth/signin']);
            }
      } )
    )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
   /*  if (this.authService.getAuth.id) return true;
    console.log('bloqueado por canLoad');
    return false; */

    return this.authService.isAuthenticated().pipe(
      tap( isAuthenticated => {
            if( !isAuthenticated ) {
              this.router.navigate(['./auth/signin']);
            }
      } )
    )
  }
}
