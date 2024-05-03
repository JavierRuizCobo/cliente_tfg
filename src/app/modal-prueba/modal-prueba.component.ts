import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-prueba',
  standalone: true,
  imports: [],
  templateUrl: './modal-prueba.component.html',
  styleUrl: './modal-prueba.component.css'
})
export class ModalPruebaComponent {

  isOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
  

}
