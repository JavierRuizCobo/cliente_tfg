import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user : User):Observable<User>{

    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(userId : string,user : User){
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  deleteUser(id : string): Observable<void>{

    return this.http.delete<void>(`${this.apiUrl}/${id}`, {withCredentials: true});


  }


}
