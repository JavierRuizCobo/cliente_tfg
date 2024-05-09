import { Injectable } from '@angular/core';
import { Ejercicio } from '../../../core/models/ejercicio.model';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private ejercicios: Ejercicio[] = [
    {
      "nombre": "Flexiones de pecho",
      "dificultad": "Media",
      "grupoMuscular": "Pecho",
      "descripcion": "Ejercicio que fortalece los músculos pectorales, deltoides y tríceps."
    }, // Ejercicio de pecho de dificultad media
    {
      "nombre": "Sentadillas",
      "dificultad": "Fácil",
      "grupoMuscular": "Piernas",
      "descripcion": "Ejercicio que fortalece los músculos cuádriceps, isquiotibiales y glúteos."
    }, // Ejercicio de piernas de dificultad fácil
    {
      "nombre": "Dominadas",
      "dificultad": "Difícil",
      "grupoMuscular": "Espalda",
      "descripcion": "Ejercicio que fortalece los músculos de la espalda, bíceps y antebrazos."
    }, // Ejercicio de espalda de dificultad difícil
    {
      "nombre": "Plancha abdominal",
      "dificultad": "Media",
      "grupoMuscular": "Abdominales",
      "descripcion": "Ejercicio que fortalece los músculos abdominales, oblicuos y la espalda baja."
    }, // Ejercicio de abdominales de dificultad media
    {
      "nombre": "Flexiones de pecho",
      "dificultad": "Media",
      "grupoMuscular": "Pecho",
      "descripcion": "Ejercicio que fortalece los músculos pectorales, deltoides y tríceps."
    }, // Ejercicio de pecho de dificultad media
    {
      "nombre": "Sentadillas",
      "dificultad": "Fácil",
      "grupoMuscular": "Piernas",
      "descripcion": "Ejercicio que fortalece los músculos cuádriceps, isquiotibiales y glúteos."
    }, // Ejercicio de piernas de dificultad fácil
    {
      "nombre": "Flexiones de pecho",
      "dificultad": "Media",
      "grupoMuscular": "Pecho",
      "descripcion": "Ejercicio que fortalece los músculos pectorales, deltoides y tríceps."
    }, // Ejercicio de pecho de dificultad media
    {
      "nombre": "Sentadillas",
      "dificultad": "Fácil",
      "grupoMuscular": "Piernas",
      "descripcion": "Ejercicio que fortalece los músculos cuádriceps, isquiotibiales y glúteos."
    }, // Ejercicio de piernas de dificultad fácil
    {
      "nombre": "Dominadas",
      "dificultad": "Difícil",
      "grupoMuscular": "Espalda",
      "descripcion": "Ejercicio que fortalece los músculos de la espalda, bíceps y antebrazos."
    }, // Ejercicio de espalda de dificultad difícil
    {
      "nombre": "Plancha abdominal",
      "dificultad": "Media",
      "grupoMuscular": "Abdominales",
      "descripcion": "Ejercicio que fortalece los músculos abdominales, oblicuos y la espalda baja."
    }, // Ejercicio de abdominales de dificultad media
    {
      "nombre": "Flexiones de pecho",
      "dificultad": "Media",
      "grupoMuscular": "Pecho",
      "descripcion": "Ejercicio que fortalece los músculos pectorales, deltoides y tríceps."
    }, // Ejercicio de pecho de dificultad media
    {
      "nombre": "Sentadillas",
      "dificultad": "Fácil",
      "grupoMuscular": "Piernas",
      "descripcion": "Ejercicio que fortalece los músculos cuádriceps, isquiotibiales y glúteos."
    } // Ejercicio de piernas de dificultad fácil
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

  getEjercicioPorNombre(nombre: string): Ejercicio | undefined {
    return this.ejercicios.find(ejercicio => ejercicio.nombre === nombre);
  }

}
