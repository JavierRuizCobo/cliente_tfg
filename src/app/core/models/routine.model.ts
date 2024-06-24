import { Exercise } from "./exercise.model";

export interface Routine {
    _id ?: string;
    name: string;
    description ?: string;
    assigned_to ?: string;
    exercises: Exercise[];
  }