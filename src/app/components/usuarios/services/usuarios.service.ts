import { Injectable } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [
    { nombre: 'Javier Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'Javier Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'Javier Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'Javier Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'Javier Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'Javier Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'Javier Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    // ...
  ];

  constructor() { }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  crearUsuario(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }

  // actualizarUsuario(usuario: Usuario): void {
  //   const index = this.usuarios.findIndex((u) => u.id === usuario.id);
  //   if (index !== -1) {
  //     this.usuarios[index] = usuario;
  //   }
  // }

  // eliminarUsuario(id: number): void {
  //   const index = this.usuarios.findIndex((u) => u.id === id);
  //   if (index !== -1) {
  //     this.usuarios.splice(index, 1);
  //   }
  // }
}
