import { Component, inject } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { em } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

  loginForm: FormGroup;
  errorMessage: string | undefined;

  authService = inject(AuthService)
  userService = inject(UserService)
  formBuilder = inject(FormBuilder)

  constructor(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  async login() {
    if (this.loginForm.valid) {
      try {
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        const response = await this.authService.login(email, password).toPromise()
        console.log(response);
        
        // const userDetails = await this.userService.getUserDetails(response.token).toPromise();
        // console.log(userDetails);
        // const userRole = userDetails.role; // Suponiendo que el rol del usuario está disponible en userDetails
        // // Almacenar el token y el rol del usuario
      } catch (error) {
        this.errorMessage = 'Correo electrónico o contraseña incorrectos';
      }
    } else {
      this.errorMessage = 'Por favor, complete todos los campos';
    }
  }
}


