// rutina.service.ts
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { PlannedRoutine } from '../../../core/models/planned-routine.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  rutinas: PlannedRoutine[] = [
    // { id: '1', nombre: 'Rutina 1', descripcion: 'Descripción de la rutina 1', fecha: new Date(2024, 4, 7), realizada: false },
    // { id: '2', nombre: 'Rutina 2', descripcion: 'Descripción de la rutina 2', fecha: new Date(2024, 4, 8), realizada: false },
    // { id: '3', nombre: 'Rutina 3', descripcion: 'Descripción de la rutina 3', fecha: new Date(2024, 4, 9), realizada: false }
  ];

  constructor() { }

  obtenerRutinasPlanificadas(): Observable<PlannedRoutine[]> {
    return of(this.rutinas);
  }

  obtenerEventos(): Observable<any[]> {
    return this.obtenerRutinasPlanificadas().pipe(
      map(rutinas => {
        return rutinas.map(rutina => ({
          title: rutina.name,
          start: rutina.date,
        }));
      })
    );
  }

}
