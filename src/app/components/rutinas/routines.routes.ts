import { Routes, RouterModule } from '@angular/router';
import { RoutinesComponent} from './components/routines/routines.component';
import { RoutineDetailsComponent } from './components/rutina-details/routine-details.component';
import { PlanRoutineComponent } from './components/plan-routine/planificar-rutina.component';

const routes: Routes = [
  { path: '', component: RoutinesComponent },
  { path: 'detalle/:id', component: RoutineDetailsComponent },
  { path: 'planificar/:id', component: PlanRoutineComponent },
];

export const RutinasRoutes = routes
