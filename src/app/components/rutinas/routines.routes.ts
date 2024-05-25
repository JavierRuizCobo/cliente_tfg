import { Routes } from '@angular/router';
import { RoutinesComponent} from './components/routines/routines.component';
import { RoutineDetailsComponent } from './components/rutina-details/routine-details.component';
import { PlanRoutineComponent } from './components/plan-routine/planificar-rutina.component';
import { DoRoutineComponent } from './components/do-routine/do-routine.component';

const routes: Routes = [
  { path: '', component: RoutinesComponent },
  { path: 'detalle/:id', component: RoutineDetailsComponent },
  { path: 'planificar/:id', component: PlanRoutineComponent },
  { path: 'realizar/:id', component: DoRoutineComponent}
];

export const RutinasRoutes = routes
