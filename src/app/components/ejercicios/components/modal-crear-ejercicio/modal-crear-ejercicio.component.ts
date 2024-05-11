import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ejercicio } from '../../../../core/models/ejercicio.model';
import { MatOptionModule } from '@angular/material/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-crear-ejercicio',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatOptionModule],
  templateUrl: './modal-crear-ejercicio.component.html',
  styleUrl: './modal-crear-ejercicio.component.css'
})
export class ModalCrearEjercicioComponent {


  nuevoEjercicio: Ejercicio = {
    nombre: '',
    dificultad: '',
    grupoMuscular: '',
    descripcion: ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(): void {
    this.activeModal.close();
  }

  agregarEjercicio(): void {
    this.activeModal.close(this.nuevoEjercicio);
  }

}
