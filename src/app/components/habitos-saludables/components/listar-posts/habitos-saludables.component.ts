import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { Post } from '../../../../core/models/post.model';
import { HabitosSaludablesService } from '../../services/habitos-saludables.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearPostComponent } from '../ModalCrearPost/ModalCrearPost.component';
import { AuthService } from '../../../../core/service/auth.service';

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
  authorized : boolean = false;

  constructor(private PostService: HabitosSaludablesService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.esMonitorOCoordinador();
    this.getALlPosts();

  }


  getALlPosts(): void{
    this.PostService.getPosts()
      .subscribe({
        next: (data) => {
          this.posts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  eliminarPost(id : string) {
    this.PostService.eliminarPost(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getALlPosts();
      },
      error: (e) => console.error(e)
    });
  }

  abrirModalCrearPost() {
    const modalRef = this.modalService.open(ModalCrearPostComponent, {
      centered: true
    });

    modalRef.result.then((result) => {
      // Esta función se ejecutará cuando se cierre el modal
      // Aquí puedes poner cualquier lógica que necesites para actualizar los posts
      this.getALlPosts();
    }, (reason) => {
      // Esta función se ejecutará si se cierra el modal de alguna manera inesperada
      console.log(`Modal cerrado de manera inesperada: ${reason}`);
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

  esMonitorOCoordinador(): void {

    this.authService.hasAnyRole(['monitor', 'coordinator']).subscribe({
      next: (data) => {
      this.authorized = data;
    }
  });

}


}
