import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { FilterPipePipe } from '../../../../shared/pipes/filterPipe.pipe';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUsuarioComponent } from '../modal-user/modal-user.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FilterPipePipe, FormsModule, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: User[] = [];
  filteredUsuarios: User[] = [];
  authorized: boolean = false;
  authorizedToViewRoutines: boolean = false;
  filtro: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedUsuarios: User[] = [];

  itemsPerPageOptions: number[] = [2, 10, 15, 20];

  constructor(
    private usuarioService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.isCoordinator();
    this.isMonitor();
  }

  getUsers(): void {
    this.usuarioService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.usuarios = data;
        this.filterUsuarios();
      }, error: (e) => console.error(e)
    });
  }

  filterUsuarios(): void {
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.name.toLowerCase().includes(this.filtro.toLowerCase()) ||
      usuario.email.toLowerCase().includes(this.filtro.toLowerCase())
    );
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsuarios.length / this.itemsPerPage);
    this.paginatedUsuarios = this.filteredUsuarios.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  setPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  setItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.currentPage = 1;
    this.updatePagination();
  }

  openCrearUsuarioModal(): void {
    const modalRef = this.modalService.open(ModalUsuarioComponent, {
      centered: true,
      size: 'xl'
    });

    modalRef.result.then((createdUser: User) => {
      
      this.getUsers();
      
    }, (reason) => {
      console.log(`Modal cerrado de manera inesperada: ${reason}`);
    });
  }

  openEditarUsuarioModal(usuario: User) {
    const modalRef = this.modalService.open(ModalUsuarioComponent, { size: 'xl' });
    modalRef.componentInstance.usuario = usuario;
    modalRef.result.then((updatedUser: User) => {
      this.getUsers();
    }, (reason) => {
      console.log(`Modal cerrado de manera inesperada: ${reason}`);
    });
  }
  

  eliminarUsuario(correoElectronico: string): void {
    this.confirmModalService.confirm('Confirm Deletion', 'Are you sure you want to delete this user?')
      .then((confirmed: any) => {
        if (confirmed) {
          this.usuarioService.deleteUser(correoElectronico).subscribe({
            next: (res) => {
              console.log(res);
              this.getUsers();
            }, error: (e) => console.error(e)
          });
        }
      });
    
  }

  verRutinas(usuario: User): void {
    console.log(`Ver rutinas del usuario: ${usuario.name}`);
    this.router.navigate([`/usuarios/${usuario._id}/rutinas`]);
  }

  isCoordinator(): void {
    this.authService.hasAnyRole(['coordinator']).subscribe({
      next: (data) => {
        console.log(data);
        this.authorized = data;
      }
    });
  }

  isMonitor(): void {
    this.authService.hasAnyRole(['monitor']).subscribe({
      next: (data) => {
        console.log(data);
        this.authorizedToViewRoutines = data;
      }
    });
  }

  activeAccount(user: User){

    this.authService.sendActivationEmail(user._id!).subscribe({
      next: (res) => {
        alert('Correo de activación enviado');
      }, error: (e) => console.error(e)
    });

  }

  desactiveAccount(user: User){

    this.confirmModalService.confirm('Confirm Deactivation', 'Are you sure you want to deactivate this user?')
      .then((confirmed: any) => {
        if (confirmed) {
          this.authService.deactivateAccount(user._id!).subscribe({
            next: (res) => {
              this.getUsers();
            }, error: (e) => console.error(e)
          });
        }
      });

  }
}
