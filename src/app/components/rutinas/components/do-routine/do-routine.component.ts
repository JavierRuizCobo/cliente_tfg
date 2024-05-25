import { Component } from '@angular/core';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { PlannedRoutinesService } from '../../services/plannedRoutines.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-do-routine',
  standalone: true,
  imports: [],
  templateUrl: './do-routine.component.html',
  styleUrl: './do-routine.component.css'
})
export class DoRoutineComponent {

  routineToComplete!: PlannedRoutine;

  constructor(private plannedRoutinesService : PlannedRoutinesService,
    private route : ActivatedRoute
  ){

  }


  ngOnInit(): void {
    this.getRoutineDetail();
  }

  getRoutineDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.plannedRoutinesService.getPlannedRoutineById(id).subscribe({
        next: (data: PlannedRoutine) => {
          console.log(data);
          this.routineToComplete = data
          console.log(this.routineToComplete)
          
        },
        error: (e) => console.error(e)
      });
    }
  }

  completeRouitne(){
    this.routineToComplete.completed = true;

    console.log(this.routineToComplete._id)

    if(this.routineToComplete?._id){
      this.plannedRoutinesService.updatePlannedRoutine(this.routineToComplete?._id,this.routineToComplete).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (e) => console.error(e)
      })


    }

    
  }


}
