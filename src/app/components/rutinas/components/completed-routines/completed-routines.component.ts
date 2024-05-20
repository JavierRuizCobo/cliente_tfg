import { Component } from '@angular/core';
import { PlannedRoutinesService } from '../../services/plannedRoutines.service';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed-routines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed-routines.component.html',
  styleUrl: './completed-routines.component.css'
})
export class CompletedRoutinesComponent {

  completedRoutines: PlannedRoutine[] = [];
  routineId: string | null = null;

  constructor(
    private plannedRoutinesService : PlannedRoutinesService,
    private route : ActivatedRoute,
  ){}

  ngOnInit(): void {
    
    this.getPlannedRoutines();
  }
  
  
  getPlannedRoutines() {
    this.routineId = this.route.snapshot.paramMap.get('id');

    if (this.routineId) {
      this.plannedRoutinesService.getPlannedRoutinesByRoutineId(this.routineId).subscribe({
        next: (data: PlannedRoutine[]) => {
          console.log(data);
          this.completedRoutines = data.filter(routine => routine.completed);
          console.log(this.completedRoutines);
        },
        error: (e) => console.error(e)
      });

    }
  }
}
