import { Injectable } from '@angular/core';
import { Exercise } from '../../../core/models/ejercicio.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private apiUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient) { }

  getEjercicios(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }

  agregarEjercicio(nuevoEjercicio: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiUrl, nuevoEjercicio);
  }

  eliminarEjercicio(id: string): Observable<Exercise> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Exercise>(url);
  }

  getEjercicioPorId(id: string): Observable<Exercise> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Exercise>(url);
  }

}
