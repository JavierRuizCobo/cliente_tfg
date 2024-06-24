import { Component, Input } from '@angular/core';
import { PlannedRoutine } from '../../../../core/models/planned-routine.model';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-completed-routine-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed-routine-detail.component.html',
  styleUrl: './completed-routine-detail.component.css'
})
export class CompletedRoutineDetailComponent {

  @Input() selectedRoutine: PlannedRoutine | null = null;
  currentPage = 1;
  itemsPerPage = 1;

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }

  getTotalPages(exercises: any[]): number {
    return Math.ceil(exercises.length / this.itemsPerPage);
  }

}
