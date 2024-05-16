import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string | null {
    const name = 'authToken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  setToken(token: string): void {
    const expirationDate = new Date();
    console.log(token)
    expirationDate.setDate(expirationDate.getDate() + 1); // Expira en 1 día
    document.cookie = `authToken=${token}; HttpOnly; expires=${expirationDate.toUTCString()}; path=/`;
    console.log(document.cookie)

  }

  removeToken(): void {
    document.cookie = 'authToken=; Secure; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }
}
