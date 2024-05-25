import { Exercise } from "./ejercicio.model";

export interface PlannedRoutine {
  _id?: string;
  routineId: string;
  name: string;
  notes: string;
  date: Date;
  completed: boolean;
  exercises: {
    exerciseId ?: string;
    exercise ?: Exercise;
    series: {
      reps: number;
      weight: number;
    }[];
  }[];
}
