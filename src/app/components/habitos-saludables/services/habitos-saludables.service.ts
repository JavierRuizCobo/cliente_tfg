import { Injectable } from '@angular/core';
import { Post } from '../../../core/models/post.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitosSaludablesService {

  private posts: Post[] = [
    { title: "Título 1", text: "Lorem ipsum dolor sit amet..." },
    { title: "Título 2", text: "Cras diam enim, pretium at lectus..." },
    { title: "Título 3", text: "I don't think the OP was overthinking things, I had the same question. If you are attempting a top 10 rank of a landing page for a highly competitive keyword, every part of your SEO counts. I changed the order of keywords in a title and bumped up 2 spots in the top 10, it isn't unreasonable to ask if its better to have text between an H1 and H2." }
  ];

  private postsSubject = new BehaviorSubject<Post[]>(this.posts);


  constructor() { }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  agregarPost(post: Post): void {
    this.posts.push(post);
    this.postsSubject.next(this.posts);
  }

  eliminarPost(post: Post): void {
    const index = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }
}
