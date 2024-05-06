import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ejercicio } from '../../../../core/models/ejercicio.model';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-modal-crear-ejercicio',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatOptionModule],
  templateUrl: './modal-crear-ejercicio.component.html',
  styleUrl: './modal-crear-ejercicio.component.css'
})
export class ModalCrearEjercicioComponent {

  constructor(public dialogRef: MatDialogRef<ModalCrearEjercicioComponent>) {}

  nuevoEjercicio: Ejercicio = {
    nombre: '',
    dificultad: '',
    grupoMuscular: '',
    descripcion: ''
  };

  cerrarModal(): void {
    this.dialogRef.close();
  }

  agregarEjercicio(): void {
    this.dialogRef.close(this.nuevoEjercicio);
  }

}
