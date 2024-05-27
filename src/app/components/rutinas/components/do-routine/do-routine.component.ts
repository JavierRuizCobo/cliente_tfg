import { Component, OnInit } from '@angular/core';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { PlannedRoutinesService } from '../../services/plannedRoutines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-do-routine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './do-routine.component.html',
  styleUrls: ['./do-routine.component.css']
})
export class DoRoutineComponent implements OnInit {

  routineToComplete!: PlannedRoutine;
  currentExerciseIndex: number = 0;
  showModal: boolean = false;

  constructor(
    private plannedRoutinesService: PlannedRoutinesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRoutineDetail();
  }

  getRoutineDetail(): void {
    const id = this.route.snapshot.paramMap.get('routineId');
    if (id !== null) {
      this.plannedRoutinesService.getPlannedRoutineById(id).subscribe({
        next: (data: PlannedRoutine) => {
          console.log(data);
          this.routineToComplete = data;
          console.log(this.routineToComplete);
        },
        error: (e) => console.error(e)
      });
    }
  }

  completeRoutine() {
    this.routineToComplete.completed = true;

    if (this.routineToComplete?._id) {
      this.plannedRoutinesService.updatePlannedRoutine(this.routineToComplete._id, this.routineToComplete).subscribe({
        next: (res) => {
          console.log(res);
          this.showModal = true;
        },
        error: (e) => console.error(e)
      });
    }
  }

  prevExercise() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
    }
  }

  nextExercise() {
    if (this.currentExerciseIndex < this.routineToComplete.exercises.length - 1) {
      this.currentExerciseIndex++;
    }
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/rutinas/detalle/', this.routineToComplete.routineId]);
  }
}
