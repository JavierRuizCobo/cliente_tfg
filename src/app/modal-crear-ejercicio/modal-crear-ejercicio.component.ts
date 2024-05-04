import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-crear-ejercicio',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './modal-crear-ejercicio.component.html',
  styleUrl: './modal-crear-ejercicio.component.css'
})
export class ModalCrearEjercicioComponent {

  constructor(public dialogRef: MatDialogRef<ModalCrearEjercicioComponent>) {}

  nuevoEjercicio: any = {};

  cerrarModal(): void {
    this.dialogRef.close();
  }

  agregarEjercicio(): void {
    this.dialogRef.close(this.nuevoEjercicio);
  }

}
