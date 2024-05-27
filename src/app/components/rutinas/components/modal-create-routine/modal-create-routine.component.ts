import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Exercise } from '../../../../core/models/ejercicio.model';
import { EjercicioService } from '../../../ejercicios/services/ejercicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectExercisesComponent } from '../modal-select-exercises/select-exercises.component';
import { CommonModule } from '@angular/common';
import { RoutinesService } from '../../services/routines.service';
import { Routine } from '../../../../core/models/routine.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-crear-rutina',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-create-routine.component.html',
  styleUrls: ['./modal-create-routine.component.css']
})
export class ModalCreateRoutineComponent {

  ejercicios: Exercise[] = [];
  @Input() userId?: string;

  constructor(private modalService: NgbModal,
              private rutinasService: RoutinesService,
              private route: ActivatedRoute) {}

  openModal() {
    const modalRef = this.modalService.open(SelectExercisesComponent, {
      centered: true,
      size: 'xl'
    });

    modalRef.componentInstance.selectedExercisesEvent.subscribe((ejercicios: Exercise[]) => {
      console.log("Ejercicios seleccionados:", ejercicios);
      this.ejercicios = ejercicios;
    });
  }

  submitRutina(form: NgForm) {
    if (form.valid && this.ejercicios.length > 0) {
      console.log('Rutina válida');
      console.log('Nombre de la rutina:', form.value.nombre);
      console.log('Descripcion de la rutina: ', form.value.descripcion)
      console.log('Ejercicios:', this.ejercicios);

      const nuevaRutina: any = {
        name: form.value.nombre,
        description: form.value.descripcion,
        exercises: this.ejercicios.map(exercise => exercise._id),
        assigned_to: this.userId
      };

      console.log(nuevaRutina);

      this.rutinasService.createRoutine(nuevaRutina).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    } else {
      console.log('Rutina inválida');
    }
  }
}
