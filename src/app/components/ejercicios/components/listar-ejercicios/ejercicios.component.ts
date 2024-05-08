import { Component, OnInit } from '@angular/core';
import {MatDialogModule } from '@angular/material/dialog';
import { Ejercicio } from '../../../../core/models/ejercicio.model';
import { EjercicioService } from '../../services/ejercicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearEjercicioComponent } from '../modal-crear-ejercicio/modal-crear-ejercicio.component';


@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})


export class EjerciciosComponent {

  ejercicios: Ejercicio[] = [];
  ejerciciosFiltrados: Ejercicio[] = [];
  filtroDificultad: string = 'todas';

  constructor(
    private ejercicioService: EjercicioService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.ejercicioService.getEjercicios().subscribe(ejercicios => {
      this.ejercicios = ejercicios;
      this.filtrarEjercicios();
    });
  }

  filtrarEjercicios() {
    if (this.filtroDificultad === 'todas') {
      this.ejerciciosFiltrados = this.ejercicios;
    } else {
      this.ejerciciosFiltrados = this.ejercicios.filter(ejercicio => ejercicio.dificultad === this.filtroDificultad);
    }
  }

  consultarEjercicio(ejercicio: Ejercicio) {
    // Lógica para consultar el ejercicio
    console.log('Consultando ejercicio:', ejercicio);
  }

  esMonitorOCoordinador(): boolean {

    return true; // Cambiar esto por la lógica real de tu aplicación
  }

  eliminarEjercicio(ejercicio: Ejercicio) {
    this.ejercicioService.eliminarEjercicio(ejercicio);
  }

  abrirModalCrearEjercicio() {

    const modalRef = this.modalService.open(ModalCrearEjercicioComponent, { 
      centered: true, 
      size : 'xl'
    });
    
    modalRef.result.then(
      (nuevoEjercicio: Ejercicio) => {
        if (nuevoEjercicio) {
          this.ejercicioService.agregarEjercicio(nuevoEjercicio);
        }
      },
      () => {}
    );
  }
}
