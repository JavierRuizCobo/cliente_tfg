import { Routes } from '@angular/router';

export const routes: Routes = [


    { 
      path: 'ejercicios', 
      loadChildren: () => import('./components/ejercicios/ejercicios.module').then(m => m.EjerciciosModule)
    },
    { 
      path: 'usuarios', 
      loadComponent: () => import('./components/usuarios/components/lista-usuarios/usuarios.component').then(m => m.ListaUsuariosComponent)
    },
    { 
      path: 'habitossaludables', 
      loadComponent: () => import('./components/habitos-saludables/components/listar-posts/habitos-saludables.component').then(m => m.HabitosSaludablesComponent)
    },
    { 
      path: 'sugerencia', 
      loadComponent: () => import('./components/sugerencia-pregunta/components/sugerencia-pregunta.component').then(m => m.SugerenciaPreguntaComponent)
    },
    { 
      path: 'calendario', 
      loadComponent: () => import('./components/calendario/components/calendario.component').then(m => m.CalendarioComponent)
    },
    { 
      path: 'rutinas', 
      loadComponent: () => import('./components/rutinas/components/rutinas/rutinas.component').then(m => m.RutinasComponent)
    }
];

