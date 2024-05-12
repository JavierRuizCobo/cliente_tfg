import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails(token: string) {
    return this.http.get<any>('http://localhost:3000/user/detalles', { headers: { Authorization: `Bearer ${token}` } }).toPromise();
  }

}
