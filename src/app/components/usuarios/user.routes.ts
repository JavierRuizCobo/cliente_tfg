import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './components/lista-usuarios/usuarios.component';
import { RoutineDetailsComponent } from '../rutinas/components/rutina-details/routine-details.component';
import { RoutinesComponent } from '../rutinas/components/routines/routines.component';
import { PlanRoutineComponent } from '../rutinas/components/plan-routine/planificar-rutina.component';
import { MultiRoleGuard } from '../../core/guards/role-guard.guard';

const routes: Routes = [
  { path: '', component: ListaUsuariosComponent },
  { path: ':userId/rutinas', component: RoutinesComponent, canActivate: [MultiRoleGuard], data: { roles: ['monitor']}},
  { path: ':userId/rutinas/detalle/:routineId', component: RoutineDetailsComponent, canActivate: [MultiRoleGuard], data: { roles: ['monitor']} },
  { path: ':userId/rutinas/detalle/:routineId/planificar', component: PlanRoutineComponent, canActivate: [MultiRoleGuard], data: { roles: ['monitor']} },
];

export const UserRoutes = routes
