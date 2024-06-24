import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import {AuthGuard} from './core/guards/authguard.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { MultiRoleGuard } from './core/guards/role-guard.guard';
import { ActivatedAccountComponent } from './core/components/activated-account/activated-account.component';
import { AuthRedirectGuard } from './core/guards/authredirect.guard';


export const routes: Routes = [

  { 
    path: 'ejercicios', 
    loadChildren: () => import('./components/exercises/exercise.routes').then(m => m.EjercicioRoutes),
    canActivate: [AuthGuard],
  },
  { 
    path: 'usuarios', 
    loadChildren: () => import('./components/users/user.routes').then(m => m.UserRoutes),
    canActivate: [AuthGuard, MultiRoleGuard],
    data: { roles: ['monitor', 'coordinator']}
  },
  { 
    path: 'habitossaludables', 
    loadComponent: () => import('./components/posts/components/posts-list/posts-list.component').then(m => m.PostListsComponent),
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
    loadComponent: () => import('./components/calendar/components/calendar.component').then(m => m.CalendarioComponent),
    canActivate: [AuthGuard, MultiRoleGuard],
    data: { roles: ['user']}
    
  },
  { 
    path: 'rutinas', 
    loadChildren: () => import('./components/routines/routines.routes').then(m => m.RutinasRoutes),
    canActivate: [AuthGuard, MultiRoleGuard],
    data: { roles: ['user']}
  },
  {
    path: 'login',
    canActivate: [AuthRedirectGuard],
    component: LoginComponent
  },

  { 
    path: 'activar-cuenta', 
    canActivate: [AuthRedirectGuard],
    component: ActivatedAccountComponent 
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

