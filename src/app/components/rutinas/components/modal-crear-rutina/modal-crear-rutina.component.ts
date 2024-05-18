import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Exercise } from '../../../../core/models/ejercicio.model';
import { EjercicioService } from '../../../ejercicios/services/ejercicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeleccionarEjerciciosComponent } from '../seleccionarEjercicios/seleccionarEjercicios.component';
import { CommonModule } from '@angular/common';
import { RutinasService } from '../../services/rutinas.service';
import { Rutina } from '../../../../core/models/rutina.model';

@Component({
  selector: 'app-modal-crear-rutina',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-crear-rutina.component.html',
  styleUrl: './modal-crear-rutina.component.css'
})
export class ModalCrearRutinaComponent {

  ejercicios: Exercise[] = [];

  constructor(private modalService: NgbModal, private rutinasService: RutinasService) {}

  openModal() {
    const modalRef = this.modalService.open(SeleccionarEjerciciosComponent, {
      centered: true,
      size:'xl'
    });

    modalRef.componentInstance.ejerciciosSeleccionadosEvent.subscribe((ejercicios: Exercise[]) => {
      console.log("Ejercicios seleccionados:", ejercicios);
      this.ejercicios = ejercicios;
      // Aquí puedes hacer lo que quieras con los ejercicios seleccionados
    });
  }

  submitRutina(form: NgForm) {
    if (form.valid && this.ejercicios.length > 0) {
      console.log('Rutina válida');
      console.log('Nombre de la rutina:', form.value.nombre);
      console.log('Descripcion de la rutina: ', form.value.descripcion)
      console.log('Ejercicios:', this.ejercicios);

      const nuevaRutina : Rutina = {
        nombre: form.value.nombre,
        descripcion: form.value.descripcion,
        ejercicios: this.ejercicios,
        id: ''
      };

      this.rutinasService.createRoutine(nuevaRutina);
      // Aquí puedes enviar la rutina a tu backend o hacer lo que necesites con los datos
    } else {
      console.log('Rutina inválida');
    }
  }

}
