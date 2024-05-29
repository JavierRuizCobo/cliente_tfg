import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../services/calendar.service';
import { PlannedRoutinesService } from '../../rutinas/services/plannedRoutines.service';
import { PlannedRoutine } from '../../../core/models/planned-routine.model';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [ CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'

})
export class CalendarioComponent implements OnInit{

  calendarOptions!: CalendarOptions;
  plannedRoutines !: PlannedRoutine[];

  
  constructor(private calendarService: CalendarService, 
    private plannedRoutinesService : PlannedRoutinesService
  ) { }

  ngOnInit() {

    this.getPlannedRoutines()

    this.calendarService.obtenerEventos().subscribe(eventos => {
      this.calendarOptions = {
        locale: 'es',
        buttonText: {
          today: 'Hoy'
        },
        initialView: 'dayGridMonth',
        weekends: true,
        editable: true,
        selectable: true,
        dayMaxEvents: true,
        plugins: [dayGridPlugin],
        events: this.mapPlannedRoutinesToEvents(eventos),
      };
    });
  
  }

  mapPlannedRoutinesToEvents(plannedRoutines: PlannedRoutine[]): any[] {
    return plannedRoutines.map(routine => {
      return {
        title: 'Rutina', // Título de la rutina
        start: routine.date, // Fecha de inicio de la rutina
        allDay: true, // Si la rutina es durante todo el día
      };
    });
  }

  getPlannedRoutines() :void{

    this.plannedRoutinesService.getAllPlannedRoutines().subscribe({
      next: (data) => {
        this.plannedRoutines = data;
        console.log(this.plannedRoutines)
      }, error: (e) => console.error(e)
    })
  }

}
