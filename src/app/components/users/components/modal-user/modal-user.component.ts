import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-User',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  @Input() User: User | undefined;

  usuarioForm: FormGroup;
  roles: string[] = ['user', 'monitor', 'coordinador'];

  constructor(
    public activeModal: NgbActiveModal,
    private usuarioService: UserService,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.User) {
      this.usuarioForm.patchValue(this.User);
    } else {
      this.usuarioForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    }
    this.usuarioForm.get('password')?.updateValueAndValidity();
  }

  crearUsuario(): void {
    if (this.usuarioForm.valid) {
      const usuarioData: User = this.usuarioForm.value;

      if (this.User) {
        this.usuarioService.updateUser(this.User._id!, usuarioData).subscribe({
          next: (res) => {
            console.log(res);
          }, error: (e) => console.error(e)
        });
      } else {
        this.usuarioService.createUser(usuarioData).subscribe({
          next: (res) => {
            console.log(res);
          }, error: (e) => console.error(e)
        });
      }
      this.activeModal.close('User creado');
    } else {
      this.usuarioForm.markAllAsTouched(); 
    }
  }
}
