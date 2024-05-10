import { Injectable } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [
    { nombre: 'Javier Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: ' Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'www Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'POe Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'ddd Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'aaa Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    { nombre: 'ffff Ruiz Cobo', correoElectronico: 'javier@gmail.com', rol: 'Coordinador' },
    // ...
  ];

  constructor() { }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  crearUsuario(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }

  actualizarUsuario(usuario: Usuario): void {
    const index = this.usuarios.findIndex((u) => u.correoElectronico === usuario.correoElectronico);
    if (index !== -1) {
      this.usuarios[index] = usuario;
    }
  }

  eliminarUsuario(correoElectronico: string): void {
    const index = this.usuarios.findIndex((u) => u.correoElectronico === correoElectronico);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
    }
  }
}
