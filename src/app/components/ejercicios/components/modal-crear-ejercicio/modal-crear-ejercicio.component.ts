import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Exercise } from '../../../../core/models/ejercicio.model';
import { MatOptionModule } from '@angular/material/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EjercicioService } from '../../services/ejercicio.service';

@Component({
  selector: 'app-modal-crear-ejercicio',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatOptionModule],
  templateUrl: './modal-crear-ejercicio.component.html',
  styleUrl: './modal-crear-ejercicio.component.css'
})
export class ModalCrearEjercicioComponent {

  newExercise: Exercise = {
    name: '',
    video: '',
    difficulty: '',
    muscles: '',
    description: ''
  };

  constructor(public activeModal: NgbActiveModal, private exerciseService: EjercicioService) {}

  cerrarModal(): void {
    this.activeModal.close();
  }

  agregarEjercicio(form: { valid: any; }): void {
    if (form.valid) {
      console.log(this.newExercise);
      this.exerciseService.agregarEjercicio(this.newExercise).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

      this.activeModal.close('Ejercicio creado');
    }
  }
}
