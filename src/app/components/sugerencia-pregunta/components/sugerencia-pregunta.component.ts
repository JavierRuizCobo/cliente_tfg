import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sugerencia-pregunta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sugerencia-pregunta.component.html',
  styleUrl: './sugerencia-pregunta.component.css'
})
export class SugerenciaPreguntaComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  contactForm: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Enviar el formulario
    console.log('Formulario enviado:');
    console.log(`Nombre: ${this.name}`);
    console.log(`Correo electrónico: ${this.email}`);
    console.log(`Mensaje: ${this.message}`);
  }

  
}
