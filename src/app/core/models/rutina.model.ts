import { Exercise } from "./ejercicio.model";

export interface Rutina {
    id: string;
    nombre: string;
    descripcion: string;
    ejercicios: Exercise[];
  }