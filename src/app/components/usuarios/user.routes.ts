import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './components/lista-usuarios/usuarios.component';
import { RoutineDetailsComponent } from '../rutinas/components/rutina-details/routine-details.component';
import { RoutinesComponent } from '../rutinas/components/routines/routines.component';

const routes: Routes = [
  { path: '', component: ListaUsuariosComponent },
  { path: ':id/rutinas', component: RoutinesComponent },
];

export const RutinasRoutes = routes
