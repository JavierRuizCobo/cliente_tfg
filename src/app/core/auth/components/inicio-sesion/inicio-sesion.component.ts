import { Component, inject } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

  email : string | null = null;
  password!: string | null;
  errorMessage: string | undefined;

  authService = inject(AuthService)
  userService = inject(UserService)


  async login() {
    try {
      const response = await this.authService.login(this.email, this.password);
      const token = response.token;
      console.log(token)
      const userDetails = await this.userService.getUserDetails(token);
      console.log(userDetails);
      const userRole = userDetails.role; // Suponiendo que el rol del usuario está disponible en userDetails
      // Almacenar el token y el rol del usuario
    } catch (error) {
      this.errorMessage = 'Correo electrónico o contraseña incorrectos';
    }
  }

}
