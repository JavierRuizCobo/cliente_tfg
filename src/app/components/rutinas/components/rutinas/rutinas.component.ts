import { Component } from '@angular/core';
import { RutinasService } from '../../services/rutinas.service';
import { Rutina } from '../../../../core/models/rutina.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearRutinaComponent } from '../modal-crear-rutina/modal-crear-rutina.component';
import { SolicitarRutinaComponent } from '../solicitar-rutina/solicitar-rutina.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.css'
})
export class RutinasComponent {

  rutinas: Rutina[] = [];

  constructor(private routineService: RutinasService,
    private modalService : NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRutinas();
  }

  getRutinas(): void {
    this.routineService.getAllRoutines()
      .subscribe(rutinas => this.rutinas = rutinas);
  }

  planificarRutina(id: string): void {
    console.log(`Planificar rutina ${id}`);
  }

  eliminarRutina(id: string): void {
    this.routineService.deleteRoutine(id);
    this.getRutinas(); // Actualizar la lista de rutinas después de eliminar
  }

  crearRutina(){

    this.modalService.open(ModalCrearRutinaComponent, {
      centered: true,
      size: 'xl'
    })

  }

  solicitarRutina(){

    this.modalService.open(SolicitarRutinaComponent, {
      centered: true
    })
    
  }
  consultarRutina(rutina : Rutina){

    this.router.navigate(['/rutinas/detalle', rutina.id]);

  }

}
