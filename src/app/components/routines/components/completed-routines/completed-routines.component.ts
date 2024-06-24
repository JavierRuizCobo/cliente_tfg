import { Component, OnInit } from '@angular/core';
import { PlannedRoutinesService } from '../../services/plannedRoutines.service';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompletedRoutineDetailComponent } from '../completed-routine-detail/completed-routine-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-completed-routines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed-routines.component.html',
  styleUrls: ['./completed-routines.component.css']
})
export class CompletedRoutinesComponent implements OnInit {

  completedRoutines: PlannedRoutine[] = [];
  originalCompletedRoutines: PlannedRoutine[] = [];
  displayedRoutines: PlannedRoutine[] = [];
  routineId: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  constructor(
    private plannedRoutinesService: PlannedRoutinesService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.getPlannedRoutines();
  }

  getPlannedRoutines() {
    this.routineId = this.route.snapshot.paramMap.get('routineId');

    if (this.routineId) {
      this.plannedRoutinesService.getPlannedRoutinesByRoutineId(this.routineId).subscribe({
        next: (data: PlannedRoutine[]) => {
          this.originalCompletedRoutines = data.filter(routine => routine.completed);
          this.completedRoutines = [...this.originalCompletedRoutines];
          this.updateDisplayedRoutines();
        },
        error: (e) => console.error(e)
      });
    }
  }

  filterByMonth(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedDate = new Date(input.value);
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth() + 1;
    this.currentPage = 1;

    this.completedRoutines = this.originalCompletedRoutines.filter(routine => {
      const routineDate = new Date(routine.date);
      return routineDate.getMonth() + 1 === selectedMonth && routineDate.getFullYear() === selectedYear;
    });
    this.updateDisplayedRoutines();
  }
  

  updateDisplayedRoutines() {
    this.totalPages = Math.ceil(this.completedRoutines.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedRoutines = this.completedRoutines.slice(startIndex, startIndex + this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedRoutines();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedRoutines();
    }
  }

  openModal(routine: PlannedRoutine) {
    const modalRef = this.modalService.open(CompletedRoutineDetailComponent, { centered: true });
    modalRef.componentInstance.selectedRoutine = routine;
  }
}
