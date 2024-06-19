import { Exercise } from "./exercise.model";

export interface PlannedRoutine {
  _id?: string;
  routineId: string;
  routineName?: string;
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
