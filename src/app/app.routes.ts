import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import {AuthGuard} from './core/guards/authguard.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { MultiRoleGuard } from './core/guards/role-guard.guard';


export const routes: Routes = [


  { 
    path: 'ejercicios', 
    loadChildren: () => import('./components/ejercicios/ejercicio.routes').then(m => m.EjercicioRoutes),
    canActivate: [AuthGuard],
  },
  { 
    path: 'usuarios', 
    loadChildren: () => import('./components/usuarios/user.routes').then(m => m.UserRoutes),
    canActivate: [AuthGuard, MultiRoleGuard],
    data: { roles: ['monitor', 'coordinator']}
  },
  { 
    path: 'habitossaludables', 
    loadComponent: () => import('./components/habitos-saludables/components/listar-posts/habitos-saludables.component').then(m => m.HabitosSaludablesComponent),
    canActivate: [AuthGuard],
  },
  { 
    path: 'sugerencia', 
    loadComponent: () => import('./components/sugerencia-pregunta/components/sugerencia-pregunta.component').then(m => m.SugerenciaPreguntaComponent),
    canActivate: [AuthGuard, MultiRoleGuard],
    data: { roles: ['user']}

  },
  { 
    path: 'calendario', 
    loadComponent: () => import('./components/calendario/components/calendario.component').then(m => m.CalendarioComponent),
    canActivate: [AuthGuard, MultiRoleGuard],
    data: { roles: ['user']}
    
  },
  { 
    path: 'rutinas', 
    loadChildren: () => import('./components/rutinas/routines.routes').then(m => m.RutinasRoutes),
    canActivate: [AuthGuard, MultiRoleGuard],
    data: { roles: ['monitor', 'user']}
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

