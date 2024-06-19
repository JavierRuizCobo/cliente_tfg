import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routine } from '../../../core/models/routine.model';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {
  private apiUrl = 'http://localhost:3000/routines';

  constructor(private http: HttpClient) { }

  getAllRoutines(): Observable<Routine[]> {
    return this.http.get<Routine[]>(this.apiUrl);
  }

  getRoutinesByUserId(userId: string): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiUrl}?selectUserId=${userId}`);
  }

  getRoutine(id: string | null): Observable<Routine> {
    return this.http.get<Routine>(`${this.apiUrl}/${id}`);
  }

  createRoutine(routine: Routine): Observable<Routine> {
    return this.http.post<Routine>(this.apiUrl, routine);
  }

  deleteRoutine(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  sendRoutineRequestMail(experiencia: string, detalles: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-routine-request`, {experiencia, detalles });
  }
}
