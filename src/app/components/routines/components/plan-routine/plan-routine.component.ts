import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routine } from '../../../../core/models/routine.model';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { RoutinesService } from '../../services/routines.service';
import { ActivatedRoute } from '@angular/router';
import { PlannedRoutinesService } from '../../services/plannedRoutines.service';
import { Exercise } from '../../../../core/models/exercise.model';
import { InformModalService } from '../../../../shared/components/inform-modal/inform-modal.service';

interface Serie {
  reps: number;
  kg: number;
}

interface ExercisePlan {
  exercise: Exercise;
  name: string;
  series: Serie[];
}

@Component({
  selector: 'app-plan-routine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './plan-routine.component.html',
  styleUrls: ['./plan-routine.component.css']
})
export class PlanRoutineComponent implements OnInit {
  date: string = new Date().toISOString().split('T')[0];
  routineToPlan?: Routine;
  exercises: ExercisePlan[] = [];
  currentExerciseIndex: number = 0;
  minDate: string | undefined;
  userId: string | undefined;

  constructor(
    private router: Router,
    private routineService: RoutinesService,
    private plannedRoutineService: PlannedRoutinesService,
    private route: ActivatedRoute,
    private informModalService: InformModalService
  ) {}

  ngOnInit(): void {
    this.getRoutineDetail();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.userId = this.route.snapshot.paramMap.get('userId') || undefined;
  }

  getRoutineDetail(): void {
    const routineId = this.route.snapshot.paramMap.get('routineId');
    if (routineId !== null) {
      this.routineService.getRoutine(routineId).subscribe({
        next: (data) => {
          this.routineToPlan = data;
          this.exercises = data.exercises
            .filter(exercise => exercise._id !== undefined)
            .map(exercise => ({
              exercise: exercise,
              name: exercise.name,
              series: []
            }));
        },
        error: (e) => console.error(e)
      });
    }
  }

  async saveRoutine() {
    if (this.routineToPlan?._id) {
      const plannedRoutine: PlannedRoutine = {
        routineId: this.routineToPlan._id,
        date: new Date(this.date),
        completed: false,
        exercises: this.exercises.map(exercise => ({
          exerciseId: exercise.exercise._id,
          series: exercise.series.map(serie => ({
            reps: serie.reps,
            weight: serie.kg
          }))
        }))
      };

      this.plannedRoutineService.createPlannedRoutine(plannedRoutine).subscribe({
        next: async (res) => {
          await this.informModalService.inform('Éxito', 'Rutina guardada exitosamente');
          if (this.userId) {
            console.log(this.userId);
            this.router.navigate([`/usuarios/${this.userId}/rutinas/detalle/${this.routineToPlan?._id}`]);
          } else {
            this.router.navigate(['/rutinas/detalle/', this.routineToPlan?._id]);
          }
        },
        error: async (e) => {
          console.error(e);
          await this.informModalService.inform('Error', 
            "Error al planificar la rutina, comprueba si las repeticiones de los ejercicios son mayores que 0 o ya tiemes una rutina planificada para ese dia.");
        }
      });
    }
  }

  addSeries(exercise: ExercisePlan) {
    exercise.series.push({ reps: 0, kg: 0 });
  }

  removeSeries(exercise: ExercisePlan, index: number) {
    exercise.series.splice(index, 1);
  }

  prevExercise() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
    }
  }

  nextExercise() {
    if (this.currentExerciseIndex < this.exercises.length - 1) {
      this.currentExerciseIndex++;
    }
  }
}
