import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/auth'; // Suponiendo que aquí está tu punto de acceso a la API de autenticación

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(correo: string, contraseña: string): Observable<any> {
    const credentials = { correo, contraseña };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.baseUrl}/iniciar-sesion`, credentials, { headers, withCredentials: true })
      .pipe(
        map(response => {
          // Aquí no necesitas almacenar el token en localStorage o en una cookie, ya que la cookie HTTPOnly se maneja automáticamente por el navegador
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }


  isLoggedIn(): boolean {
    
    return false;
  }

  logout(): Observable<boolean> {
    // Realizar la solicitud de cierre de sesión
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }) // Usar withCredentials para enviar las cookies
      .pipe(
        map(() => {
          // Eliminar el token almacenado en la cookie
          this.tokenService.removeToken();
          return true;
        }),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('AuthService Error:', error);
    return throwError(() => new Error('error'))
  }
}
