import { Ejercicio } from "./ejercicio.model";

export interface Rutina {
    id: string;
    nombre: string;
    descripcion: string;
    ejercicios: Ejercicio[];
  }