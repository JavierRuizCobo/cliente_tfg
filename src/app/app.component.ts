import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HabitosSaludablesComponent } from './habitos-saludables/habitos-saludables.component';
import { SugerenciaPreguntaComponent } from './sugerencia-pregunta/sugerencia-pregunta.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, HabitosSaludablesComponent, EjerciciosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cliente_tfg';
}
