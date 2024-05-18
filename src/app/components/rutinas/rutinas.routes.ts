import { Routes, RouterModule } from '@angular/router';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { DetallesRutinaComponent } from './components/detalles-rutina/detalles-rutina.component';

const routes: Routes = [
  { path: '', component: RutinasComponent },
  { path: 'detalle/:id', component: DetallesRutinaComponent },
  { path: 'planificar/:id', component: DetallesRutinaComponent },
];

export const RutinasRoutes = routes
