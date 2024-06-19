import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutinesService } from '../../services/routines.service';
import { InformModalService } from '../../../../shared/components/inform-modal/inform-modal.service';

@Component({
  selector: 'app-solicitar-rutina',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-request-routine.component.html',
  styleUrl: './modal-request-routine.component.css'
})
export class RequestRoutineComponent {

  form: FormGroup;

  constructor(private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder, 
    private routineService : RoutinesService,
    private informModalService: InformModalService
  ){
    this.form = this.formBuilder.group({
      experience: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { experience, details } = this.form.value;
      this.routineService.sendRoutineRequestMail(experience, details).subscribe({
        next: () => {
          this.informModalService.inform('Éxito', 'Solicitud enviada exitosamente.');
          this.activeModal.close();
        },
        error: (error) => {
          this.informModalService.inform('Error', 'Error al enviar la solicitud. Por favor, inténtelo de nuevo más tarde.');
        }
    });
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
