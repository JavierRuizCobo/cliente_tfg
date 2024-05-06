import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearEjercicioComponent } from '../components/modal-crear-ejercicio/modal-crear-ejercicio.component'; 
import { Ejercicio } from '../../../core/models/ejercicio.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalCrearEjercicioService {

  constructor(public dialog: MatDialog) {}

  abrirModal(): Observable<Ejercicio> {
    const dialogRef = this.dialog.open(ModalCrearEjercicioComponent);
    return dialogRef.afterClosed();
  }
}
