import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import {AuthGuard} from './core/guards/authguard.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { EjerciciosComponent } from './components/ejercicios/components/listar-ejercicios/ejercicios.component';

export const routes: Routes = [


  { 
    path: 'ejercicios', 
    loadChildren: () => import('./components/ejercicios/ejercicio.routes').then(m => m.EjercicioRoutes),
    canActivate: [AuthGuard],
    data: { expectedRole: 'coordinador' }
  },
  { 
    path: 'usuarios', 
    loadComponent: () => import('./components/usuarios/components/lista-usuarios/usuarios.component').then(m => m.ListaUsuariosComponent),
    canActivate: [AuthGuard],
    data: { expectedRole: 'coordinador' }
  },
  { 
    path: 'habitossaludables', 
    loadComponent: () => import('./components/habitos-saludables/components/listar-posts/habitos-saludables.component').then(m => m.HabitosSaludablesComponent),
    canActivate: [AuthGuard],
    data: { expectedRole: 'coordinador' }
  },
  { 
    path: 'sugerencia', 
    loadComponent: () => import('./components/sugerencia-pregunta/components/sugerencia-pregunta.component').then(m => m.SugerenciaPreguntaComponent),
    canActivate: [AuthGuard],
    data: { expectedRole: 'user' }
  },
  { 
    path: 'calendario', 
    loadComponent: () => import('./components/calendario/components/calendario.component').then(m => m.CalendarioComponent),
    canActivate: [AuthGuard],
    data: { expectedRole: 'coordinador' }
  },
  { 
    path: 'rutinas', 
    loadChildren: () => import('./components/rutinas/routines.routes').then(m => m.RutinasRoutes),
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'ejercicios',
    pathMatch: 'full'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }
];

