import { Component, OnInit } from '@angular/core';
import {MatDialogModule } from '@angular/material/dialog';
import { Exercise } from '../../../../core/models/ejercicio.model';
import { EjercicioService } from '../../services/ejercicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearEjercicioComponent } from '../modal-crear-ejercicio/modal-crear-ejercicio.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})


export class EjerciciosComponent {

  ejercicios: Exercise[] = [];
  ejerciciosFiltrados: Exercise[] = [];
  filtroDificultad: string = 'todas';

  constructor(
    private ejercicioService: EjercicioService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllExercises();
  }

  getAllExercises(): void{
    this.ejercicioService.getEjercicios()
      .subscribe({
        next: (data) => {
          this.ejercicios = data;
          this.filtrarEjercicios();
        },
        error: (e) => console.error(e)
      });
  }

  filtrarEjercicios() {
    if (this.filtroDificultad === 'todas') {
      this.ejerciciosFiltrados = this.ejercicios;
    } else {
      this.ejerciciosFiltrados = this.ejercicios.filter(ejercicio => ejercicio.difficulty === this.filtroDificultad);
    }
  }

  consultarEjercicio(ejercicio: Exercise) {
    // Lógica para consultar el ejercicio
    this.router.navigate(['/ejercicios/detalle', ejercicio._id]);
  }

  esMonitorOCoordinador(): boolean {

    return true; // Cambiar esto por la lógica real de tu aplicación
  }

  eliminarEjercicio(ejercicio: Exercise) {
    
    if(ejercicio._id){
      this.ejercicioService.eliminarEjercicio(ejercicio._id).subscribe({
        next: (res) => {
          console.log(res);
          this.getAllExercises();
        },
        error: (e) => console.error(e)
      });

    } 
  }

  abrirModalCrearEjercicio() {

    const modalRef = this.modalService.open(ModalCrearEjercicioComponent, { 
      centered: true, 
      size : 'xl'
    });

    modalRef.result.then((result) => {
      // Esta función se ejecutará cuando se cierre el modal
      // Aquí puedes poner cualquier lógica que necesites para actualizar los posts
      this.getAllExercises();
    }, (reason) => {
      // Esta función se ejecutará si se cierra el modal de alguna manera inesperada
      console.log(`Modal cerrado de manera inesperada: ${reason}`);
    });
    
  }
}
