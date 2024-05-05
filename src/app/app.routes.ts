import { Routes } from '@angular/router';

export const routes: Routes = [


    { 
      path: 'ejercicios', 
      loadComponent: () => import('./components/ejercicios/components/listar-ejercicios/ejercicios.component').then(m => m.EjerciciosComponent)
    },
    { 
      path: 'usuarios', 
      loadComponent: () => import('./components/usuarios/components/lista-usuarios/usuarios.component').then(m => m.ListaUsuariosComponent)
    },
    { 
      path: 'habitossaludables', 
      loadComponent: () => import('./components/habitos-saludables/components/listar-posts/habitos-saludables.component').then(m => m.HabitosSaludablesComponent)
    }

];

