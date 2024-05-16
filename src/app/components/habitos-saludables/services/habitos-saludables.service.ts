import { Injectable } from '@angular/core';
import { Post } from '../../../core/models/post.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitosSaludablesService {

  private apiUrl = 'http://localhost:3000/posts'; // Cambia esto por la URL de tu servidor Express
  
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  agregarPost(post: Post): Observable<any> {
  
    return this.http.post<Post[]>(this.apiUrl, post);
  }

  eliminarPost(postId: string) :  Observable<any>{
    const url = `${this.apiUrl}/${postId}`;

    return this.http.delete<Post[]>(url);
  }
}
