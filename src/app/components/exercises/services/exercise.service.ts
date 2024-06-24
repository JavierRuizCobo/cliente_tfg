import { Injectable } from '@angular/core';
import { Exercise } from '../../../core/models/exercise.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }

  addExercise(newExercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiUrl, newExercise);
  }

  deleteExercise(id: string): Observable<Exercise> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Exercise>(url);
  }

  updateExercise(updatedExercise: Exercise): Observable<Exercise> {
    const url = `${this.apiUrl}/${updatedExercise._id}`;
    return this.http.put<Exercise>(url, updatedExercise);
  }

  getExerciseById(id: string): Observable<Exercise> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Exercise>(url);
  }

}
