import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';
import { Usuario } from '../../../../core/models/usuario.model';
import { FilterPipePipe } from '../../../../shared/pipes/filterPipe.pipe';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FilterPipePipe, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuarioSeleccionado!: Usuario;

  filtro: string = '';

  constructor(private usuarioService: UsuarioService,
    private modalService : NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usuarioService.getUsers().subscribe({
      next: (data) => {
        console.log(data)
        this.usuarios = data;
      }, error: (e) => console.error(e)
    });

  }


  openCrearUsuarioModal(): void {

    this.modalService.open(ModalUsuarioComponent, {
      centered: true,
      size: 'xl'
    });
  }

  openEditarUsuarioModal(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    const modalRef = this.modalService.open(ModalUsuarioComponent, { size: 'xl' });
    modalRef.componentInstance.usuario = usuario;
  }

  eliminarUsuario(correoElectronico : string){
    this.usuarioService.deleteUser(correoElectronico).subscribe({
      next: (res) =>{
        console.log(res);
        this.getUsers();
      }, error : (e) => console.error(e)
    })
  }

  verRutinas(usuario: Usuario): void {
    console.log(`Ver rutinas del usuario: ${usuario.name}`);

    this.router.navigate([`/usuarios/${usuario._id}/rutinas`]);
  }
}

