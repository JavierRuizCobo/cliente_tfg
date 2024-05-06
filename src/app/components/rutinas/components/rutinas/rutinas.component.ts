import { Component } from '@angular/core';
import { RutinasService } from '../../services/rutinas.service';
import { Rutina } from '../../../../core/models/rutina.model';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.css'
})
export class RutinasComponent {

  rutinas: Rutina[] = [];

  constructor(private routineService: RutinasService) { }

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

  }

  solicitarRutina(){
    
  }

}
