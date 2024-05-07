import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../services/calendar.service';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [ CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'

})
export class CalendarioComponent {

  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: []
  };

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.obtenerRutinas();
  }

  obtenerRutinas(): void {
    this.calendarService.obtenerRutinas().subscribe(rutinas => {
      this.calendarOptions.events = rutinas.map(rutina => {
        return {
          title: rutina.nombre,
          start: rutina.fecha,
          description: rutina.nombre,
        };
      });
    });
  };
}
