import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalCrearEjercicioComponent } from './modal-crear-ejercicio/modal-crear-ejercicio.component';

interface Ejercicio {
  nombre: string;
  dificultad: string;
  grupoMuscular: string;
}

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})


export class EjerciciosComponent{

  ejercicios: Ejercicio[] = [
  { nombre: 'Flexiones de pecho', dificultad: 'Media', grupoMuscular: 'Pecho' },
  { nombre: 'Sentadillas', dificultad: 'Fácil', grupoMuscular: 'Piernas' },
  { nombre: 'Dominadas', dificultad: 'Difícil', grupoMuscular: 'Espalda' },
  { nombre: 'Plancha abdominal', dificultad: 'Media', grupoMuscular: 'Abdominales' },
  { nombre: 'Flexiones de pecho', dificultad: 'Media', grupoMuscular: 'Pecho' },
  { nombre: 'Sentadillas', dificultad: 'Fácil', grupoMuscular: 'Piernas' },
  { nombre: 'Flexiones de pecho', dificultad: 'Media', grupoMuscular: 'Pecho' },
  { nombre: 'Sentadillas', dificultad: 'Fácil', grupoMuscular: 'Piernas' },
  { nombre: 'Dominadas', dificultad: 'Difícil', grupoMuscular: 'Espalda' },
  { nombre: 'Plancha abdominal', dificultad: 'Media', grupoMuscular: 'Abdominales' },
  { nombre: 'Flexiones de pecho', dificultad: 'Media', grupoMuscular: 'Pecho' },
  { nombre: 'Sentadillas', dificultad: 'Fácil', grupoMuscular: 'Piernas' },
  ]


  filtroDificultad: string = 'todas';
  ejerciciosFiltrados: Ejercicio[] = [];

  constructor(public dialog: MatDialog) {
    this.filtrarEjercicios();
  }

  filtrarEjercicios() {
    if (this.filtroDificultad === 'todas') {
      this.ejerciciosFiltrados = this.ejercicios;
    } else {
      this.ejerciciosFiltrados = this.ejercicios.filter(ejercicio => ejercicio.dificultad === this.filtroDificultad);
    }
  }

  consultarEjercicio(ejercicio: Ejercicio) {
    // Lógica para consultar el ejercicio
    console.log('Consultando ejercicio:', ejercicio);
  }

  esMonitorOCoordinador(): boolean {
    // Lógica para verificar si el usuario tiene el rol de monitor o coordinador
    // Retorna true si el usuario tiene el rol de monitor o coordinador, de lo contrario retorna false
    return true; // Cambiar esto por la lógica real de tu aplicación
  }

  eliminarEjercicio(ejercicio: Ejercicio) {
    // Lógica para eliminar el ejercicio
    this.ejercicios = this.ejercicios.filter(e => e !== ejercicio);
    this.filtrarEjercicios();
    console.log('Eliminando ejercicio:', ejercicio);  
  
  }

  openDialog() {
    // Abre el modal para crear un nuevo ejercicio
    const dialogRef = this.dialog.open(ModalCrearEjercicioComponent);

    dialogRef.afterClosed().subscribe(nuevoEjercicio => {
      if (nuevoEjercicio) {
        this.ejercicios.push(nuevoEjercicio);
        this.filtrarEjercicios();
      }
    });
  }
  
}
