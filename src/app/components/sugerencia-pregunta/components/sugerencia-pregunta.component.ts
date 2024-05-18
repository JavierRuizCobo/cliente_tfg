import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-sugerencia-pregunta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sugerencia-pregunta.component.html',
  styleUrl: './sugerencia-pregunta.component.css'
})

export class SugerenciaPreguntaComponent {
  mailForm: FormGroup;

  constructor(private formBuilder : FormBuilder, private questionsService : QuestionsService) {
    this.mailForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.mailForm.valid) {

      this.questionsService.sendMail(this.mailForm.value).subscribe({
        next: (res) => {
          console.log(res)

        },
        error: (e) => console.error(e)
      })
    }
  }

  
}
