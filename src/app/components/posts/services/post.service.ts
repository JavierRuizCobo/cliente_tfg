import { Injectable } from '@angular/core';
import { Post } from '../../../core/models/post.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/posts';
  
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post<Post[]>(this.apiUrl, post);
  }

  deletePost(postId: string): Observable<any> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.delete<Post[]>(url);
  }
}
