import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, map, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<Boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/ejercicios']); // o la ruta que prefieras
        return false;
        }
        return true;
      })
    );
  }

  
}
