import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

@Component({
  selector: 'app-habitos-saludables',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './habitos-saludables.component.html',
  styleUrl: './habitos-saludables.component.css'
})
export class HabitosSaludablesComponent {

  text = "I don't think the OP was overthinking things, I had the same question. If you are attempting a top 10 rank of a landing page for a highly competitive keyword, every part of your SEO counts. I changed the order of keywords in a title and bumped up 2 spots in the top 10, it isn't unreasonable to ask if its better to have text between an H1 and H2."
  data = [
    { "title": "Título 1", "text": "Lorem ipsum dolor sit amet..." },
    { "title": "Título 2", "text": "Cras diam enim, pretium at lectus..." },
    { "title": "Título 3", "text": "I don't think the OP was overthinking things, I had the same question. If you are attempting a top 10 rank of a landing page for a highly competitive keyword, every part of your SEO counts. I changed the order of keywords in a title and bumped up 2 spots in the top 10, it isn't unreasonable to ask if its better to have text between an H1 and H2." }
  ];
  
  newPost = {
    title: '',
    text: ''
  };

  crearPost() {
    if (this.newPost.title && this.newPost.text) {
      this.data.push({ "title": this.newPost.title, "text": this.newPost.text });
      this.newPost.title = '';
      this.newPost.text = '';
      this.cerrarModal();
    }
  }

  eliminarPost(post: any) {
    const index = this.data.indexOf(post);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  modalVisible = false;

  mostrarModal() {
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }
}
