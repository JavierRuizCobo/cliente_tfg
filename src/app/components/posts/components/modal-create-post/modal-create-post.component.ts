import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../../../core/models/post.model';
import { PostService } from '../../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './modal-create-post.component.html',
  styleUrls: ['./modal-create-post.component.css']
})
export class ModalCreatePostComponent implements OnInit {

  newPost: Post = {
    title: '',
    content: ''
  };

  constructor(public activeModal: NgbActiveModal, private postService: PostService) {}

  ngOnInit() {}

  createPost(form: { valid: any; }): void {
    if (form.valid) {
      console.log(this.newPost);
      this.postService.addPost(this.newPost).subscribe({
        next: (res) => {
          console.log(res);
          this.activeModal.close('Post creado');
        },
        error: (e) => console.error(e)
      });
    }
  }
}
