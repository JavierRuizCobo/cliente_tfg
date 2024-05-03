import { Component, OnInit } from '@angular/core';


interface Ejercicio {
  nombre: string;
  dificultad: string;
  grupoMuscular: string;
}

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})


export class EjerciciosComponent implements OnInit{
  ejercicios: Ejercicio[] = [];


  constructor() { }

  ngOnInit(): void {
    // Aquí puedes obtener los ejercicios de tu servicio o de cualquier otra fuente de datos
    this.ejercicios = [
      { nombre: 'Flexiones de pecho', dificultad: 'Media', grupoMuscular: 'Pecho' },
      { nombre: 'Sentadillas', dificultad: 'Fácil', grupoMuscular: 'Piernas' },
      { nombre: 'Dominadas', dificultad: 'Difícil', grupoMuscular: 'Espalda' },
      { nombre: 'Plancha abdominal', dificultad: 'Media', grupoMuscular: 'Abdominales' },
      { nombre: 'Flexiones de pecho', dificultad: 'Media', grupoMuscular: 'Pecho' },
      { nombre: 'Sentadillas', dificultad: 'Fácil', grupoMuscular: 'Piernas' },

    ];

  }

  consultarEjercicio(ejercicio: Ejercicio) {
    // Navegar a la página de detalles del ejercicio pasando el nombre como parámetro
    console.log("Hola")
  }


}
