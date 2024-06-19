import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activated-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activated-account.component.html',
  styleUrl: './activated-account.component.css'
})
export class ActivatedAccountComponent {

  activationToken: string | null = null;
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.activationToken = params['token'];
    });
    
    if(!this.activationToken){
      this.router.navigate(['/login']);
    }
  }

  activateAccount(): void {

    if (this.activationToken && this.email && this.password) {
      this.authService.activateAccount(this.activationToken, this.email, this.password).subscribe({
        next: (res) =>{
          this.message = 'Cuenta activada con éxito.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);

        },
        error: (error) =>{
          console.error(error);
          this.message = 'Error al activar la cuenta: ' + error.error.message;
        } 
      }       
      );
    } else {
      this.message = 'Por favor, completa todos los campos.';
    }
  }

}
