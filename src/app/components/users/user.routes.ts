import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './components/users-list/users-list.component';
import { MultiRoleGuard } from '../../core/guards/role-guard.guard';
import { RoutinesComponent } from '../routines/components/routines/routines.component';
import { RoutineDetailsComponent } from '../routines/components/routine-details/routine-details.component';
import { PlanRoutineComponent } from '../routines/components/plan-routine/plan-routine.component';

const routes: Routes = [
  { path: '', component: ListaUsuariosComponent },
  { path: ':userId/rutinas', component: RoutinesComponent, canActivate: [MultiRoleGuard], data: { roles: ['monitor']}},
  { path: ':userId/rutinas/detalle/:routineId', component: RoutineDetailsComponent, canActivate: [MultiRoleGuard], data: { roles: ['monitor']} },
  { path: ':userId/rutinas/detalle/:routineId/planificar', component: PlanRoutineComponent, canActivate: [MultiRoleGuard], data: { roles: ['monitor']} },
];

export const UserRoutes = routes
