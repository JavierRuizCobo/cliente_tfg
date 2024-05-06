import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { Post } from '../../../../core/models/post.model';
import { HabitosSaludablesService } from '../../services/habitos-saludables.service';

@Component({
  selector: 'app-habitos-saludables',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './habitos-saludables.component.html',
  styleUrl: './habitos-saludables.component.css'
})

export class HabitosSaludablesComponent {
  posts: Post[] = [];


  constructor(
    private PostService: HabitosSaludablesService,
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
  abrirModalCrearPost(){
    
  }
}
