import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RoutinesService } from '../../services/routines.service';
import { Routine } from '../../../../core/models/routine.model';
import { PlannedRoutinesComponent } from '../planned-routines/planned-routines.component';
import { CompletedRoutinesComponent } from '../completed-routines/completed-routines.component';

@Component({
  selector: 'app-routine-details',
  standalone: true,
  imports: [PlannedRoutinesComponent, CompletedRoutinesComponent, RouterLink],
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.css']
})
export class RoutineDetailsComponent implements OnInit {

  routine: Routine | undefined;
  selectedTab: string = 'details';

  constructor(
    private route: ActivatedRoute,
    private routineService: RoutinesService
  ) { }

  ngOnInit(): void {
    this.getRoutineDetail();
  }

  getRoutineDetail(): void {
    const id = this.route.snapshot.paramMap.get('routineId');
    if (id !== null) {
      this.routineService.getRoutine(id).subscribe({
        next: (data: Routine | undefined) => {
          this.routine = data;
        }, 
        error: (e: any) => console.error(e)
      });
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}
