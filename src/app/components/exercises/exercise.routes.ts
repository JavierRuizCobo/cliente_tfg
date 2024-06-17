import { Routes } from '@angular/router';


const routes: Routes = [
    { path: '', 
    loadComponent : () => import('./components/exercises-list/exercise-list.component').then( m =>  m.ExerciseListComponent) },
    { path: 'detalle/:id', 
    loadComponent : () => import('./components/exercise-detail/exercise-detail.component').then( m =>  m.ExerciseDetailComponent)}
];

export const EjercicioRoutes = routes