import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../../../../core/models/ejercicio.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { EjercicioService } from '../../../ejercicios/services/ejercicio.service';

@Component({
  selector: 'app-select-exercises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-exercises.component.html',
  styleUrls: ['./select-exercises.component.css']
})
export class SelectExercisesComponent implements OnInit {

  availableExercises: Exercise[] = [];
  selectedExercises: Exercise[] = [];
  activeModal: any;

  constructor(
    private exerciseService: EjercicioService,
    private modalService: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.exerciseService.getEjercicios().subscribe({
      next: (data) => {
        this.availableExercises = data;
      }
    });

    console.log(this.availableExercises);
  }

  toggleSelection(event: any, exercise: Exercise) {
    if (event.target.checked) {
      this.selectedExercises.push(exercise);
    } else {
      const index = this.selectedExercises.findIndex(e => e.name === exercise.name);
      if (index !== -1) {
        this.selectedExercises.splice(index, 1);
      }
    }
  }

  addExercises() {
    this.emitSelection();
    this.modalService.close();
    this.selectedExercises = [];
  }

  @Output() selectedExercisesEvent = new EventEmitter<Exercise[]>();

  emitSelection() {
    this.selectedExercisesEvent.emit(this.selectedExercises);
  }

}
