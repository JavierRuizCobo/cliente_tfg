import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../../../core/models/post.model';
import { HabitosSaludablesService } from '../../services/habitos-saludables.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ModalCrearPost',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './ModalCrearPost.component.html',
  styleUrls: ['./ModalCrearPost.component.css']
})
export class ModalCrearPostComponent implements OnInit {

  newPost: Post = {
    title: '',
    content: ''
  };

  constructor(public activeModal: NgbActiveModal, private postService: HabitosSaludablesService) {}

  ngOnInit() {}

  crearPost(form: { valid: any; }): void {
    if (form.valid) {
      console.log(this.newPost)
      this.postService.agregarPost(this.newPost).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

      this.activeModal.close('Post creado');
    }
  }

}
