import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inform-modal',
  standalone: true,
  imports: [],
  templateUrl: './inform-modal.component.html',
  styleUrl: './inform-modal.component.css'
})
export class InformModalComponent {

  @Input() title: string = '';
  @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}

}
