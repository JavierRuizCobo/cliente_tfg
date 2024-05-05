import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HabitosSaludablesComponent } from './habitos-saludables/habitos-saludables.component';
import { SugerenciaPreguntaComponent } from './sugerencia-pregunta/sugerencia-pregunta.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { ListaUsuariosComponent } from './usuarios/usuarios.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, HabitosSaludablesComponent, EjerciciosComponent, ListaUsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cliente_tfg';
}
