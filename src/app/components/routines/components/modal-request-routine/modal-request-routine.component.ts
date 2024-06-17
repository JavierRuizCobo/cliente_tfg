import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutinesService } from '../../services/routines.service';

@Component({
  selector: 'app-solicitar-rutina',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-request-routine.component.html',
  styleUrl: './modal-request-routine.component.css'
})
export class RequestRoutineComponent {

  form: FormGroup;

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private routineService : RoutinesService) {
    this.form = this.formBuilder.group({
      experience: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { user, experience, details } = this.form.value;
      this.routineService.sendRoutineRequestMail(user, experience, details).subscribe(
        response => {
          console.log('Correo enviado con éxito', response);
          this.activeModal.close();
        },
        error => {
          console.error('Error al enviar el correo', error);
          alert('Error al enviar el correo. Por favor, inténtelo de nuevo más tarde.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos del form.');
    }
  }

  onCancel() {
    console.log('form cancelado');

    this.activeModal.close();
    this.form.reset();
  }

  

}
