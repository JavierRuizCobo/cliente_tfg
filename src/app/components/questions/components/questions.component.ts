import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { ConfirmModalService } from '../../../shared/components/confirm-modal/confirm-modal.service';
import { InformModalService } from '../../../shared/components/inform-modal/inform-modal.service';

@Component({
  selector: 'app-sugerencia-pregunta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class SugerenciaPreguntaComponent {
  mailForm: FormGroup;
  showPopup: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private questionsService: QuestionsService,
    private confirmModalService : ConfirmModalService,
    private informModalService: InformModalService) {
    this.mailForm = this.formBuilder.group({
      userSubject: ['', Validators.required],
      userMessage: ['', Validators.required]
    });
  }

  
  onSubmit(): void {
    if (this.mailForm.valid) {

      this.confirmModalService.confirm('Enviar Correo', '¿Estás seguro que quieres enviar el correo?')
      .then((confirmed: any) => {
        if (confirmed) {
          this.questionsService.sendMail(this.mailForm.value).subscribe({
            next: (res) => {
              this.informModalService.inform('Éxito', 'Correo enviado exitosamente');
              this.mailForm.reset();
            },
            error: (e) => this.informModalService.inform('Error', 'El correo no se ha podido enviar')
          });
        }
      });
    }
  }
}
