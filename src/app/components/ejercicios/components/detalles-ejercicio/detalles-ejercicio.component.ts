import { Component } from '@angular/core';
import { EjercicioService } from '../../services/ejercicio.service';
import { Exercise } from '../../../../core/models/ejercicio.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-ejercicio',
  standalone: true,
  imports: [],
  templateUrl: './detalles-ejercicio.component.html',
  styleUrl: './detalles-ejercicio.component.css'
})
export class DetallesEjercicioComponent {

  ejercicio: Exercise | undefined;

  constructor(
    private route: ActivatedRoute,
    private ejercicioService: EjercicioService
  ) { }

  ngOnInit(): void {
    console.log("Hola")
    this.route.params.subscribe(params => {
      const nombreEjercicio = params['id'];
      this.ejercicioService.getEjercicioPorId(nombreEjercicio).subscribe({
        next: (data) => {
          this.ejercicio = data;

        }, 
        error: (e) => console.error(e)
      });
    });
  }


}
