import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRole = route.data['expectedRole'];

    return this.authService.isAuthenticated().pipe(
      take(1),
      switchMap(isAuthenticated => {

        console.log(isAuthenticated);
        if (!isAuthenticated) {
          console.log("NO sesion", isAuthenticated)
          this.router.navigate(['/login']);
          return [false];
        }

        return this.authService.getUserRole().pipe(
          take(1),
          map(userRole => {
            if (expectedRole && userRole !== expectedRole) {
              console.log(expectedRole);
              console.log(userRole);
              this.router.navigate(['/unauthorized']);
              return false;
            }
            return true;
          })
        );
      })
    );
  }
}
