import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ejercicio } from '../../../../core/models/ejercicio.model';
import { EjercicioService } from '../../../ejercicios/services/ejercicio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccionarEjercicios',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './seleccionarEjercicios.component.html',
  styleUrls: ['./seleccionarEjercicios.component.css']
})
export class SeleccionarEjerciciosComponent implements OnInit {

  ejerciciosDisponibles: Ejercicio[] = [];
  ejerciciosSeleccionados: Ejercicio[] = [];
  activeModal: any;

  constructor(private ejercicioService: EjercicioService,
    private modalService: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.ejercicioService.getEjercicios().subscribe(ejercicios => {
      this.ejerciciosDisponibles = ejercicios;
    });

    console.log(this.ejerciciosDisponibles)
  }

  toggleSeleccion(event: any, ejercicio: Ejercicio) {
    if (event.target.checked) {
      this.ejerciciosSeleccionados.push(ejercicio);
    } else {
      const index = this.ejerciciosSeleccionados.findIndex(e => e.nombre === ejercicio.nombre);
      if (index !== -1) {
        this.ejerciciosSeleccionados.splice(index, 1);
      }
    }
  }

  agregarEjercicios() {
    this.emitirSeleccion();
    this.modalService.close(); // Cerrar el modal
    this.ejerciciosSeleccionados = [];
  }

  @Output() ejerciciosSeleccionadosEvent = new EventEmitter<Ejercicio[]>();

  emitirSeleccion() {
    this.ejerciciosSeleccionadosEvent.emit(this.ejerciciosSeleccionados);
  }

}
