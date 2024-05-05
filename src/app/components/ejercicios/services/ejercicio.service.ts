import { Injectable } from '@angular/core';
import { Ejercicio } from '../../../core/models/ejercicio.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private ejercicios: Ejercicio[] = [
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
  ];

  private ejerciciosSubject = new BehaviorSubject<Ejercicio[]>(this.ejercicios);

  constructor() {}

  getEjercicios(): Observable<Ejercicio[]> {
    return this.ejerciciosSubject.asObservable();
  }

  agregarEjercicio(nuevoEjercicio: Ejercicio): void {
    this.ejercicios.push(nuevoEjercicio);
    this.ejerciciosSubject.next(this.ejercicios);
  }

  eliminarEjercicio(ejercicio: Ejercicio): void {
    this.ejercicios = this.ejercicios.filter(e => e !== ejercicio);
    this.ejerciciosSubject.next(this.ejercicios);
  }
}
