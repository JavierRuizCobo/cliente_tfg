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
export class CalendarioComponent implements OnInit{

  calendarOptions!: CalendarOptions;

  
  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
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
        events: eventos,
      };
    });
  }

}
