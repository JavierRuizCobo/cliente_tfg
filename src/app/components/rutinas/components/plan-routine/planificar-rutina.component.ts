import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routine } from '../../../../core/models/routine.model';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { RoutinesService } from '../../services/routines.service';
import { ActivatedRoute } from '@angular/router';
import { PlannedRoutinesService } from '../../services/plannedRoutines.service';
import { Exercise } from '../../../../core/models/ejercicio.model';

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
  selector: 'app-planificar-rutina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './planificar-rutina.component.html',
  styleUrls: ['./planificar-rutina.component.css']
})
export class PlanRoutineComponent implements OnInit {
  routine: string = 'Chest/Triceps';
  date: string = new Date().toISOString().split('T')[0];
  routineToPlan?: Routine;
  exercises: ExercisePlan[] = [];
  currentExerciseIndex: number = 0;
  showModal: boolean = false;

  constructor(
    private router: Router,
    private routineService: RoutinesService,
    private plannedRoutineService: PlannedRoutinesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getRoutineDetail();
  }

  getRoutineDetail(): void {
    const id = this.route.snapshot.paramMap.get('routineId');
    if (id !== null) {
      this.routineService.getRoutine(id).subscribe({
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

  saveRoutine() {
    if (this.routineToPlan?._id) {
      const plannedRoutine: PlannedRoutine = {
        routineId: this.routineToPlan._id,
        name: this.routineToPlan.name,
        notes: '',
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

      console.log(plannedRoutine);

      this.plannedRoutineService.createPlannedRoutine(plannedRoutine).subscribe({
        next: (res) => {
          console.log(res);
          this.showModal = true;
          this.router.navigate(['/rutinas/detalle/', this.routineToPlan?._id]);
        },
        error: (e) => console.error(e)
      })
    }
  }

  addSeries(exercise: ExercisePlan) {
    exercise.series.push({ reps: 0, kg: 0 });
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

  closeModal() {
    this.showModal = false;
  }
}
