import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultiRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const roles = route.data['roles'] as string[];
    console.log(route.data)
    return this.authService.hasAnyRole(roles).pipe(
      map(isAuthorized => {
        if (!isAuthorized) {
          this.router.navigate(['/unauthorized']);
        }
        return isAuthorized;
      })
    );
  }
}
