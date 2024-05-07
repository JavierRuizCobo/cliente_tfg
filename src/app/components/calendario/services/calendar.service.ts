// rutina.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  obtenerRutinas(): Observable<any[]> {
    // Simulamos que obtenemos las rutinas de alguna manera
    const rutinas = [
      { id: 1, nombre: 'Rutina 1', fecha: new Date(2024, 4, 7) },
      { id: 2, nombre: 'Rutina 2', fecha: new Date(2024, 4, 8) },
      { id: 3, nombre: 'Rutina 3', fecha: new Date(2024, 4, 9) }
    ];
    return of(rutinas);
  }
}
