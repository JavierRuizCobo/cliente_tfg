import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}


  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/esta-autenticado`).pipe(
      map(response => response.authenticated),
      catchError(() => of(false))
    );
  }

  hasRole(role: string): Observable<boolean> {
    return this.http.get<{ authorized: boolean }>(`${this.apiUrl}/rol/${role}`).pipe(
      map(response => response.authorized),
      catchError(() => of(false))
    );
  }

  hasAnyRole(roles: string[]): Observable<boolean> {

    const rolesParam = roles.join(',');
    return this.http.get<{ authorized: boolean }>(`${this.apiUrl}/comprobar-roles?roles=${rolesParam}`).pipe(
      map(response => response.authorized),
      catchError(() => of(false))
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/iniciar-sesion`, { email, password }, { withCredentials: true })
      .pipe(tap((response: any) => {
        console.log('Login response:', response);
      }));
  }

  logout(): Observable<void> {
    // Aquí llama al endpoint correspondiente en tu servidor para cerrar sesión
    // Por ejemplo, si tu servidor tiene un endpoint /logout que elimina el token de sesión:
    return this.http.post<void>(`${this.apiUrl}/cerrar-sesion`, null);
  }

}
