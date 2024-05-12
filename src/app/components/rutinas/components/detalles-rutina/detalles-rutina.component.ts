import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutinasService } from '../../services/rutinas.service';
import { Rutina } from '../../../../core/models/rutina.model';

@Component({
  selector: 'app-detalles-rutina',
  standalone: true,
  imports: [],
  templateUrl: './detalles-rutina.component.html',
  styleUrl: './detalles-rutina.component.css'
})
export class DetallesRutinaComponent {

  rutina: Rutina | undefined;

  constructor(
    private route: ActivatedRoute,
    private rutinaService: RutinasService
  ) { }

  ngOnInit(): void {
    this.getRutinaDetalle();
    console.log(this.rutina);
  }

  getRutinaDetalle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.rutinaService.getRutina(id)
        .subscribe((rutina: Rutina | null) => this.rutina = rutina || undefined);
    }
  }


}
