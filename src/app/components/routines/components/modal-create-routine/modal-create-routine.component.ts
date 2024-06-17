import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Exercise } from '../../../../core/models/exercise.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectExercisesComponent } from '../modal-select-exercises/select-exercises.component';
import { CommonModule } from '@angular/common';
import { RoutinesService } from '../../services/routines.service';

@Component({
  selector: 'app-modal-crear-rutina',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-create-routine.component.html',
  styleUrls: ['./modal-create-routine.component.css']
})
export class ModalCreateRoutineComponent {

  exercises: Exercise[] = [];
  @Input() userId?: string;

  constructor(private modalService: NgbModal,
              private routinesService: RoutinesService,
              public activeModal: NgbActiveModal,
            ) {}

  openModal() {
    const modalRef = this.modalService.open(SelectExercisesComponent, {
      centered: true,
      size: 'xl'
    });

    modalRef.componentInstance.selectedExercisesEvent.subscribe((exercises: Exercise[]) => {
      console.log("Ejercicios seleccionados:", exercises);
      this.exercises = exercises;
    });
  }

  submitRutina(form: NgForm) {
    if (form.valid && this.exercises.length > 0) {

      const newRoutine: any = {
        name: form.value.name,
        description: form.value.description,
        exercises: this.exercises.map(exercise => exercise._id),
        assigned_to: this.userId
      };

      console.log(newRoutine);

      this.routinesService.createRoutine(newRoutine).subscribe({
        next: (data) => {
          console.log(data);
          this.activeModal.close();
        },
        error: (e) => console.error(e)
      });
    } else {
      console.log('Rutina inválida');
    }
  }
}
