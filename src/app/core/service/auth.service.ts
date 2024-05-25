import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthResponse {
  authenticated: boolean;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/iniciar-sesion`, { email, password }, { withCredentials: true })
      .pipe(tap((response: any) => {
        console.log('Login response:', response);
        this.checkAuth().subscribe();
      }));
  }

  checkAuth(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/esta-autenticado`, { withCredentials: true })
      .pipe(tap(response => {
        this.loggedIn.next(response.authenticated);
        this.userRole.next(response.role || null);
      }));
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserRole(): Observable<string | null> {
    return this.userRole.asObservable();
  }
}
