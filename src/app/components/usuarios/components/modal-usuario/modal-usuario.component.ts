import { Component } from '@angular/core';
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

  nuevoUsuario: Usuario = {
    nombre: '',
    correoElectronico: '',
    rol: ''
  };

  constructor(public activeModal: NgbActiveModal, private usuarioService: UsuarioService) {}

  ngOnInit() {}

  crearUsuario(form: { valid: any; }): void {
    if (form.valid) {
      this.usuarioService.crearUsuario(this.nuevoUsuario);
      this.activeModal.close('Post creado');
    }
  }

}
