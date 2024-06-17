import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../../core/models/post.model';
import { PostService } from '../../services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePostComponent } from '../modal-create-post/modal-create-post.component';
import { AuthService } from '../../../../core/service/auth.service';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-healthy-habits',
  standalone: true,
  imports: [FormsModule, ModalCreatePostComponent],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostListsComponent {
  posts: Post[] = [];
  currentPage: number = 1;
  postsPerPage: number = 1;
  authorized: boolean = false;

  constructor(
    private postService: PostService,
    private modalService: NgbModal,
    private authService: AuthService,
    private confirmModalService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.checkAuthorization();
    this.fetchAllPosts();
  }

  fetchAllPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  deletePost(id: string) {
    this.confirmModalService.confirm('Confirm Deletion', 'Are you sure you want to delete this post?')
      .then((confirmed: any) => {
        if (confirmed) {
          this.postService.deletePost(id).subscribe({
            next: () => {
              this.fetchAllPosts();
              this.currentPage = 1;
            },
            error: (e) => console.error(e)
          });
        }
      });
  }

  openCreatePostModal() {
    const modalRef = this.modalService.open(ModalCreatePostComponent, {
      centered: true
    });

    modalRef.result.then((createdPost: Post) => {
      if (createdPost) {
        this.fetchAllPosts();
      }
    }, (reason) => {
      console.log(`Modal closed unexpectedly: ${reason}`);
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

  checkAuthorization(): void {
    this.authService.hasAnyRole(['monitor', 'coordinator']).subscribe({
      next: (data) => {
        this.authorized = data;
      }
    });
  }
}
