import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-solicitar-rutina',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-request-routine.component.html',
  styleUrl: './modal-request-routine.component.css'
})
export class RequestRoutineComponent {

  formulario: FormGroup;

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      experiencia: ['', Validators.required],
      detalles: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      // Aquí puedes enviar los datos a través de un servicio o hacer cualquier otra acción con ellos
    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }

  onCancel() {
    // Aquí puedes cerrar el modal, restablecer el formulario o cualquier otra lógica de cancelación
    console.log('Formulario cancelado');

    this.activeModal.close();
    this.formulario.reset();
  }

  

}
