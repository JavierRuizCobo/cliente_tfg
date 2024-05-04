import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuarios.service';

interface Usuario {
  nombre: string;
  correoElectronico: string;
  rol: string;
}


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getUsuarios();
  }
}
