import { Component } from '@angular/core';
import { PlannedRoutinesService } from '../../services/plannedRoutines.service';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompletedRoutineDetailComponent } from '../completed-routine-detail/completed-routine-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-planned-routines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planned-routines.component.html',
  styleUrl: './planned-routines.component.css'
})
export class PlannedRoutinesComponent {

  plannedRoutines: PlannedRoutine[] = [];
  routineId: string | null = null;
  userId?: string;


  constructor(
    private plannedRoutinesService : PlannedRoutinesService,
    private route : ActivatedRoute,
    private router: Router,
    private modalService : NgbModal,
    private confirmModalService : ConfirmModalService
  ){}

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('userId') || undefined;
    this.getPlannedRoutines();
  }
  
  
  getPlannedRoutines() {
    this.routineId = this.route.snapshot.paramMap.get('routineId');

    if (this.routineId) {
      this.plannedRoutinesService.getPlannedRoutinesByRoutineId(this.routineId).subscribe({
        next: (data: PlannedRoutine[]) => {
          this.plannedRoutines = data.filter(routine => routine.completed===false);
        },
        error: (e) => console.error(e)
      });

    }
  }

  deletePlannedRoutine(routine : any){
  
     this.confirmModalService.confirm('Confirmar eliminación',
      '¿Estás seguro que quieres eliminar esta rutina planificada?')
     .then((confirmed: any) => {
       if (confirmed) {
        this.plannedRoutinesService.deletePlannedRoutine(routine._id).subscribe({
          next: (res) => {
            console.log(res);
            this.getPlannedRoutines();
          },error: (e) => console.error(e)
        });
       }
     });
  }

  completePlannedRoutine(routine : any){
    this.router.navigate(['/rutinas/realizar', routine._id]);

  }

  planNewRoutine(){

    this.routineId = this.route.snapshot.paramMap.get('routineId');

    if (this.userId) {

      this.router.navigate([`/usuarios/${this.userId}/rutinas/detalle/${this.routineId}/planificar`]);
    } else{
      this.router.navigate(['/rutinas/planificar', this.routineId]);
    }

  }

  openModal(routine: PlannedRoutine) {
    const modalRef = this.modalService.open(CompletedRoutineDetailComponent, { centered: true });
    modalRef.componentInstance.selectedRoutine = routine;
  }

}
