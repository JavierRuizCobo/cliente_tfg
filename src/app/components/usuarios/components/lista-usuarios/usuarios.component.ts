import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';
import { Usuario } from '../../../../core/models/usuario.model';
import { FilterPipePipe } from '../../../../shared/pipes/filterPipe.pipe';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FilterPipePipe, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  filtro: string = '';

  constructor(private usuarioService: UsuarioService,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getUsuarios();
  }


  openCrearUsuarioModal(): void {

    this.modalService.open(ModalUsuarioComponent, {
      centered: true
    });
  }
}

