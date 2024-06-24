import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { PlannedRoutinesService } from '../../routines/services/plannedRoutines.service';
import { PlannedRoutine } from '../../../core/models/planned-routine.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompletedRoutineDetailComponent } from '../../routines/components/completed-routine-detail/completed-routine-detail.component';

interface Day {
  date: number | null;
  routines: any[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarioComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  days: Day[] = [];
  plannedRoutines: PlannedRoutine[] = [];

  constructor(
    private plannedRoutinesService: PlannedRoutinesService,
    private router: Router,
    private modalService: NgbModal
  ) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit() {
    this.getPlannedRoutines();
  }

  getPlannedRoutines(): void {
    this.plannedRoutinesService.getAllPlannedRoutines().subscribe({
      next: (data: PlannedRoutine[]) => {
        this.plannedRoutines = data;
        console.log(this.plannedRoutines);
        this.generateCalendar();
      },
      error: (e) => console.error(e)
    });
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

    const daysInCalendar = Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - adjustedFirstDay + 1;
      return dayNumber > 0 && dayNumber <= lastDateOfMonth ? dayNumber : null;
    });

    this.days = daysInCalendar.map(date => ({
      date: date,
      routines: date ? this.getRoutinesForDate(date) : []
    }));
  }

  getRoutinesForDate(day: number): any[] {
    const dateStr = formatDate(new Date(this.currentYear, this.currentMonth, day), 'yyyy-MM-dd', 'en-US');
    return this.plannedRoutines.filter(routine => {
      const routineDateStr = formatDate(new Date(routine.date), 'yyyy-MM-dd', 'en-US');
      return routineDateStr === dateStr;
    });
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[monthIndex];
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  completeRoutine(routineId: string): void {
    this.router.navigate(['/rutinas/realizar', routineId]);
  }

  viewRoutine(routine: PlannedRoutine): void {
    const modalRef = this.modalService.open(CompletedRoutineDetailComponent, { centered: true });
    modalRef.componentInstance.selectedRoutine = routine;
  }
}
