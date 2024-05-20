import { Component, OnInit } from '@angular/core';
import { RoutinesService } from '../../services/routines.service';
import { Routine } from '../../../../core/models/routine.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateRoutineComponent } from '../modal-create-routine/modal-create-routine.component';
import { RequestRoutineComponent } from '../modal-request-routine/modal-request-routine.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [],
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  routines: Routine[] = [];

  constructor(
    private routineService: RoutinesService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRoutines();
  }

  getRoutines(): void {
    this.routineService.getAllRoutines()
      .subscribe({
        next: (data) => {
          this.routines = data;
        },
        error: (e) => console.error(e)
      });

  }

  planRoutine(id: string): void {
    console.log(`Plan routine ${id}`);
    this.router.navigate(['/rutinas/planificar', id]);

  }

  deleteRoutine(id: string): void {

    console.log(id);
    this.routineService.deleteRoutine(id).subscribe({
      next: () => {
        this.getRoutines();
      },
      error: (e) => console.error(e)
    });
  }

  createRoutine() {

    const modalRef = this.modalService.open(ModalCreateRoutineComponent, {
      centered: true,
      size: 'xl'
    })

    modalRef.result.then(() => {

      this.getRoutines();
    });

  }

  requestRoutine() {

    this.modalService.open(RequestRoutineComponent, {
      centered: true,
      windowClass: 'custom-modal'
    })

  }
  viewRoutine(routine: Routine) {

    this.router.navigate(['/rutinas/detalle', routine._id]);

  }

}
