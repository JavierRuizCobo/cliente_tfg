import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlannedRoutine } from '../../../core/models/planned-routine.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlannedRoutinesService {

  private apiUrl = 'http://localhost:3000/planned-routines';

  constructor(private http: HttpClient) { }

  // Método para crear una rutina planificada
  createPlannedRoutine(plannedRoutine: PlannedRoutine): Observable<PlannedRoutine> {
    return this.http.post<PlannedRoutine>(this.apiUrl, plannedRoutine);
  }

  // Método para actualizar una rutina planificada
  updatePlannedRoutine(id: string, plannedRoutine: PlannedRoutine): Observable<PlannedRoutine> {
    return this.http.put<PlannedRoutine>(`${this.apiUrl}/${id}`, plannedRoutine);
  }

  getPlannedRoutineById(id: string): Observable<PlannedRoutine> {
    return this.http.get<PlannedRoutine>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener todas las rutinas planificadas
  getAllPlannedRoutines(): Observable<PlannedRoutine[]> {
    return this.http.get<PlannedRoutine[]>(this.apiUrl);
  }

  // Método para eliminar una rutina planificada
  deletePlannedRoutine(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener todas las rutinas planificadas por rutinaId
  getPlannedRoutinesByRoutineId(routineId: string): Observable<PlannedRoutine[]> {
    return this.http.get<PlannedRoutine[]>(`${this.apiUrl}/routine/${routineId}`);
  }
}
