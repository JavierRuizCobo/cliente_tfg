import { Routes, RouterModule } from '@angular/router';
import { EjerciciosComponent } from './components/listar-ejercicios/ejercicios.component';
import { DetallesEjercicioComponent } from './components/detalles-ejercicio/detalles-ejercicio.component';


const routes: Routes = [
    { path: '', 
    loadComponent : () => import('./components/listar-ejercicios/ejercicios.component').then( m =>  m.EjerciciosComponent) },
    { path: 'detalle/:id', 
    loadComponent : () => import('./components/detalles-ejercicio/detalles-ejercicio.component').then( m =>  m.DetallesEjercicioComponent)}
];

export const EjercicioRoutes = routes