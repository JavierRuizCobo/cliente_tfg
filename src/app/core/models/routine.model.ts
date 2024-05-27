import { Exercise } from "./ejercicio.model";

export interface Routine {
    _id ?: string;
    name: string;
    description ?: string;
    assigned_to ?: string;
    exercises: Exercise[];
  }