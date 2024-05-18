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
        { name: 'Sentadillas', difficulty: 'Intermedio', muscles: 'Piernas', description: 'Las sentadillas son un ejercicio compuesto que trabaja los músculos de las piernas, los glúteos y la espalda baja.' },
        { name: 'Press de banca', difficulty: 'Avanzado', muscles: 'Pecho', description: 'El press de banca es un ejercicio para desarrollar los músculos pectorales, deltoides anteriores y tríceps.' },
        { name: 'Dominadas', difficulty: 'Avanzado', muscles: 'Espalda', description: 'Las dominadas son un ejercicio excelente para desarrollar la fuerza de la espalda, los hombros y los brazos.' }
      ]
    },
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
