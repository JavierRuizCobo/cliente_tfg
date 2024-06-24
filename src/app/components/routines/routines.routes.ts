import { Routes } from '@angular/router';
import { RoutinesComponent} from './components/routines/routines.component';
import { RoutineDetailsComponent } from './components/routine-details/routine-details.component';
import { PlanRoutineComponent } from './components/plan-routine/plan-routine.component';
import { DoRoutineComponent } from './components/do-routine/do-routine.component';

const routes: Routes = [
  { path: '', component: RoutinesComponent },
  { path: 'detalle/:routineId', component: RoutineDetailsComponent },
  { path: 'planificar/:routineId', component: PlanRoutineComponent },
  { path: 'realizar/:routineId', component: DoRoutineComponent}
];

export const RutinasRoutes = routes
