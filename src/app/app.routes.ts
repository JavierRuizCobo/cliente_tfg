import { Routes } from '@angular/router';

export const routes: Routes = [


    { 
      path: 'ejercicios', 
      loadComponent: () => import('./ejercicios/ejercicios.component').then(m => m.EjerciciosComponent)
    },
    { 
      path: 'usuarios', 
      loadComponent: () => import('./usuarios/usuarios.component').then(m => m.ListaUsuariosComponent)
    },
    { 
      path: 'habitossaludables', 
      loadComponent: () => import('./habitos-saludables/habitos-saludables.component').then(m => m.HabitosSaludablesComponent)
    }

];

