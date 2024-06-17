import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../../../../core/models/exercise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../../../exercises/services/exercise.service';

@Component({
  selector: 'app-select-exercises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-exercises.component.html',
  styleUrls: ['./select-exercises.component.css']
})
export class SelectExercisesComponent implements OnInit {

  availableExercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  selectedExercises: Exercise[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private modalService: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe({
      next: (data) => {
        this.availableExercises = data;
        this.filteredExercises = data;
        console.log(this.availableExercises);
      }
    });
  }

  toggleSelection(event: any, exercise: Exercise) {
    if (event.target.checked) {
      this.selectedExercises.push(exercise);
      this.filteredExercises = this.filteredExercises.filter(e => e._id !== exercise._id);
    } else {
      this.selectedExercises = this.selectedExercises.filter(e => e._id !== exercise._id);
      this.filteredExercises.push(exercise);
      this.filteredExercises.sort((a, b) => a.name.localeCompare(b.name)); // Optional: keep the list sorted
    }
  }

  searchExercise(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredExercises = this.availableExercises.filter(exercise =>
      exercise.name.toLowerCase().includes(query) && !this.selectedExercises.some(e => e._id === exercise._id)
    );
  }

  filterByMuscle(muscleGroup: string) {
    this.filteredExercises = this.availableExercises.filter(exercise =>
      exercise.muscles === muscleGroup && !this.selectedExercises.some(e => e._id === exercise._id)
    );
  }

  clearFilter() {
    this.filteredExercises = this.availableExercises.filter(exercise => 
      !this.selectedExercises.some(e => e._id === exercise._id)
    );
  }

  addExercises() {
    this.emitSelection();
    this.modalService.close();
    this.selectedExercises = [];
  }

  removeSelectedExercise(exercise: Exercise) {
    this.selectedExercises = this.selectedExercises.filter(e => e._id !== exercise._id);
    this.filteredExercises.push(exercise);
    this.filteredExercises.sort((a, b) => a.name.localeCompare(b.name)); // Optional: keep the list sorted
  }

  @Output() selectedExercisesEvent = new EventEmitter<Exercise[]>();

  emitSelection() {
    this.selectedExercisesEvent.emit(this.selectedExercises);
  }

  trackById(index: number, item: Exercise) {
    return item._id;
  }
}
