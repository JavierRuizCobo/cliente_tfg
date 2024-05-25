import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../../../core/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.apiUrl, {withCredentials : true});
  }

  createUser(user : Usuario){
    

  }

  updateUser(user : Usuario){

  }

  deleteUser(id : string): Observable<void>{

    return this.http.delete<void>(`${this.apiUrl}/${id}`, {withCredentials: true});


  }


}
