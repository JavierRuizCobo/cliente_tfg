import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../services/usuarios.service';
import { Usuario } from '../../../../core/models/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent {

  @Input() usuario: Usuario | undefined;

  nuevoUsuario: Usuario = {
    name: '',
    email: '',
    role: ''
  };

  roles: string[] = ['Cliente', 'Monitor', 'Coordinador'];

  constructor(public activeModal: NgbActiveModal, private usuarioService: UsuarioService) {}

  ngOnInit() {
    if (this.usuario) {
      this.nuevoUsuario = { ...this.usuario }; // Clonar el usuario para no modificar el original
    }
  }

  crearUsuario(form: { valid: any; }): void {
    if (form.valid) {

      if (this.usuario) {
        this.usuarioService.updateUser(this.nuevoUsuario);
      } else {
        this.usuarioService.createUser(this.nuevoUsuario);
      }
      this.activeModal.close('Post creado');
    }
  }

}
