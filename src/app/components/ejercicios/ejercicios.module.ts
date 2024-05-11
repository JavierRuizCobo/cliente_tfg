import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EjerciciosComponent } from './components/listar-ejercicios/ejercicios.component';
import { DetallesEjercicioComponent } from './components/detalles-ejercicio/detalles-ejercicio.component';

const routes: Routes = [
  { path: '', component: EjerciciosComponent },
  { path: 'detalle/:id', component: DetallesEjercicioComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EjerciciosModule { }
