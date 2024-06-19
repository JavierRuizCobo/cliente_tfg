import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}


  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/is-authenticated`).pipe(
      tap(response => {
        console.log('Respuesta de autenticación:', response);
      }),
      map(response => response.authenticated),
      catchError((error) => {
        console.error('Error en la autenticación:', error);
        return of(false);
      })
    );
  }


  hasAnyRole(roles: string[]): Observable<boolean> {

    const rolesParam = roles.join(',');
    return this.http.get<{ authorized: boolean }>(`${this.apiUrl}/check-roles?roles=${rolesParam}`).pipe(
      map(response => response.authorized),
      catchError(() => of(false))
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(tap((response: any) => {
        console.log('Login response:', response);
      }));
  }

  activateAccount(token: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/activate-account`, { token, email, password });
  }

  deactivateAccount(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/desactivate-account`, { userId });
  }

  sendActivationEmail(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-activation-email`, { userId });
  }


  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, null);
  }

}
