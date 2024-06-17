import { Component } from '@angular/core';
import { PlannedRoutinesService } from '../../services/plannedRoutines.service';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompletedRoutineDetailComponent } from '../completed-routine-detail/completed-routine-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService : NgbModal
  ){}

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('userId') || undefined;
    this.getPlannedRoutines();
  }
  
  
  getPlannedRoutines() {
    this.routineId = this.route.snapshot.paramMap.get('routineId');

    if (this.routineId) {
      console.log(this.routineId);
      this.plannedRoutinesService.getPlannedRoutinesByRoutineId(this.routineId).subscribe({
        next: (data: PlannedRoutine[]) => {
          console.log(data);
          this.plannedRoutines = data.filter(routine => routine.completed===false);
          console.log(this.plannedRoutines);
        },
        error: (e) => console.error(e)
      });

    }
  }

  deletePlannedRoutine(routine : any){
    if(window.confirm('Are sure you want to delete this item ?')){

      this.plannedRoutinesService.deletePlannedRoutine(routine._id).subscribe({
        next: (res) => {
          console.log(res);
          this.getPlannedRoutines();
        },error: (e) => console.error(e)
      });
     }
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
