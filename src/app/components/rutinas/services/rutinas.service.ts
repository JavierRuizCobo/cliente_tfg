import { Injectable } from '@angular/core';
import { Rutina } from '../../../core/models/rutina.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  private rutinas: Rutina[] = [
    {
      id: '1',
      nombre: 'Rutina de fuerza',
      descripcion: 'Rutina para ganar fuerza muscular',
      ejercicios: [
        { nombre: 'Sentadillas', dificultad: 'Intermedio', grupoMuscular: 'Piernas', descripcion: 'Las sentadillas son un ejercicio compuesto que trabaja los músculos de las piernas, los glúteos y la espalda baja.' },
        { nombre: 'Press de banca', dificultad: 'Avanzado', grupoMuscular: 'Pecho', descripcion: 'El press de banca es un ejercicio para desarrollar los músculos pectorales, deltoides anteriores y tríceps.' },
        { nombre: 'Dominadas', dificultad: 'Avanzado', grupoMuscular: 'Espalda', descripcion: 'Las dominadas son un ejercicio excelente para desarrollar la fuerza de la espalda, los hombros y los brazos.' }
      ]
    },
    {
      id: '2',
      nombre: 'Rutina de cardio',
      descripcion: 'Rutina para mejorar la resistencia cardiovascular',
      ejercicios: [
        { nombre: 'Carrera en cinta', dificultad: 'Intermedio', grupoMuscular: 'Cardio', descripcion: 'Carrera en cinta para mejorar la resistencia cardiovascular y quemar calorías.' },
        { nombre: 'Ciclismo', dificultad: 'Intermedio', grupoMuscular: 'Cardio', descripcion: 'Ciclismo para mejorar la resistencia cardiovascular y tonificar las piernas.' },
        { nombre: 'Natación', dificultad: 'Intermedio', grupoMuscular: 'Cardio', descripcion: 'Natación para mejorar la resistencia cardiovascular y fortalecer todo el cuerpo.' }
      ]
    },
    {
      id: '3',
      nombre: 'Rutina de flexibilidad',
      descripcion: 'Rutina para mejorar la flexibilidad muscular',
      ejercicios: [
        { nombre: 'Estiramientos de piernas', dificultad: 'Principiante', grupoMuscular: 'Flexibilidad', descripcion: 'Estiramientos de piernas para mejorar la flexibilidad de los músculos de las piernas.' },
        { nombre: 'Estiramientos de brazos', dificultad: 'Principiante', grupoMuscular: 'Flexibilidad', descripcion: 'Estiramientos de brazos para mejorar la flexibilidad de los músculos de los brazos y hombros.' },
        { nombre: 'Estiramientos de espalda', dificultad: 'Principiante', grupoMuscular: 'Flexibilidad', descripcion: 'Estiramientos de espalda para mejorar la flexibilidad de la espalda y aliviar la tensión.' }
      ]
    }
  ];

  constructor() { }

  // Obtener todas las rutinas de entrenamiento
  getAllRoutines(): Observable<Rutina[]> {
    return of(this.rutinas);
  }

  getRutina(id: string | null): Observable<Rutina | null> {
    if (id === null) {
      return of(null);
    }
    const rutina = this.rutinas.find(rutina => rutina.id === id);
    return of(rutina || null);
  }

  // Crear una nueva rutina de entrenamiento
  createRoutine(routine: Rutina): void {
    this.rutinas.push(routine);
  }

  // Actualizar una rutina de entrenamiento existente
  updateRoutine(id: string, updatedRoutine: Rutina): void {
    const index = this.rutinas.findIndex(rutina => rutina.id === id);
    if (index !== -1) {
      this.rutinas[index] = updatedRoutine;
    }
  }

  // Eliminar una rutina de entrenamiento
  deleteRoutine(id: string): void {
    this.rutinas = this.rutinas.filter(rutina => rutina.id !== id);
  }
}
