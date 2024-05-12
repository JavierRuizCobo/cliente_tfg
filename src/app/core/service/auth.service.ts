import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;
  private userRole: string | null = null;

  constructor(private http: HttpClient) { }

  async login(correo: string | null, contraseña: string | null) {
    try {
      const response: any = await this.http.post('http://localhost:3000/auth/iniciar-sesion', { correo, contraseña }).toPromise();
      this.token = response.token;
      return response;
    } catch (error) {
      throw error;
    }
  }

  getToken(): string | null {
    return this.token;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    this.token = null;
    this.userRole = null;
  }
}
