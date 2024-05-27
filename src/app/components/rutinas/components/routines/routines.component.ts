import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutinesService } from '../../services/routines.service';
import { Routine } from '../../../../core/models/routine.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateRoutineComponent } from '../modal-create-routine/modal-create-routine.component';
import { RequestRoutineComponent } from '../modal-request-routine/modal-request-routine.component';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [],
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  routines: Routine[] = [];
  userId?: string; // Agregar una propiedad para userId

  constructor(
    private routineService: RoutinesService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute // Inyectar ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') || undefined;
    this.getRoutines();
  }

  getRoutines(): void {

    if (this.userId) {
      this.routineService.getRoutinesByUserId(this.userId)
        .subscribe({
          next: (data) => {
            this.routines = data;
          },
          error: (e) => console.error(e)
        });
    } else {
      this.routineService.getAllRoutines()
        .subscribe({
          next: (data) => {
            this.routines = data;
          },
          error: (e) => console.error(e)
        });
    }
  }

  planRoutine(id: string): void {
    this.router.navigate(['/rutinas/planificar', id]);
  }

  deleteRoutine(id: string): void {
    this.routineService.deleteRoutine(id).subscribe({
      next: () => {
        this.getRoutines();
      },
      error: (e) => console.error(e)
    });
  }

  createRoutine(): void {
    const modalRef = this.modalService.open(ModalCreateRoutineComponent, {
      centered: true,
      size: 'xl'
    });

    modalRef.componentInstance.userId = this.userId;

    modalRef.result.then(() => {
      this.getRoutines();
    });
  }

  requestRoutine(): void {
    this.modalService.open(RequestRoutineComponent, {
      centered: true,
      windowClass: 'custom-modal'
    });
  }

  viewRoutine(routine: Routine): void {

    if (this.userId) {

      console.log(this.userId);
      this.router.navigate([`/usuarios/${this.userId}/rutinas/detalle/${routine._id}`]);
    } else{
    this.router.navigate(['/rutinas/detalle', routine._id]);

    }
  }

}
