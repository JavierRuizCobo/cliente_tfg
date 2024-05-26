import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { LoginComponent } from "../../core/components/login/login.component";


@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [RouterModule, CommonModule, LoginComponent]
})
export class HeaderComponent {

  isAuthenticated: boolean = false;
  isUser: boolean = false;
  isMonitorOrCoordinator: boolean = false;

  constructor(private authService: AuthService, private router : Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.authService.hasAnyRole(['user']).subscribe(isUser => {
          this.isUser = isUser;
        });
        this.authService.hasAnyRole(['monitor', 'coordinator']).subscribe(isMonitorOrCoordinator => {
          this.isMonitorOrCoordinator = isMonitorOrCoordinator;
        });
      }
    });
  }


  logout(): void {

    const confirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmed) {
      this.authService.logout().subscribe({
        next: (res) =>{
          console.log(res);
  
          this.authService.isAuthenticated().subscribe(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;
          });
  
          this.router.navigate(['/login']);        
        }
      });
    }
    
  }
}
