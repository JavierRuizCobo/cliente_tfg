import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { Post } from '../../../../core/models/post.model';
import { HabitosSaludablesService } from '../../services/habitos-saludables.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearPostComponent } from '../ModalCrearPost/ModalCrearPost.component';

@Component({
  selector: 'app-habitos-saludables',
  standalone: true,
  imports: [FormsModule, ModalCrearPostComponent],
  templateUrl: './habitos-saludables.component.html',
  styleUrl: './habitos-saludables.component.css'
})

export class HabitosSaludablesComponent {
  posts: Post[] = [];
  currentPage: number = 1;
  postsPerPage: number = 1;

  constructor(private PostService: HabitosSaludablesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.PostService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  esMonitorOCoordinador(): boolean {
    return true; // Cambiar esto por la lógica real de tu aplicación
  }

  eliminarPost(post: Post) {
    this.PostService.eliminarPost(post);
  }

  abrirModalCrearPost() {
    this.modalService.open(ModalCrearPostComponent, {
      centered: true
    });
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.postsPerPage);
  }

  get postsToShow(): Post[] {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    return this.posts.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  changePostsPerPage(): void {
    this.currentPage = 1;
}


}
