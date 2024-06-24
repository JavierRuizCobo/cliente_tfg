import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { ConfirmModalService } from '../components/confirm-modal/confirm-modal.service';



@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [RouterModule, CommonModule]
})
export class HeaderComponent {

  isAuthenticated: boolean = false;
  isUser: boolean = false;
  isMonitorOrCoordinator: boolean = false;

  constructor(private authService: AuthService, private router : Router,
    private confirmModalService: ConfirmModalService

  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      console.log("Headerrrr");
      console.log(isAuthenticated);
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        console.log("Headerrrr")
        
        this.authService.hasAnyRole(['user']).subscribe(isUser => {
          this.isUser = isUser;
        });
        this.authService.hasAnyRole(['monitor', 'coordinator']).subscribe(isMonitorOrCoordinator => {
          this.isMonitorOrCoordinator = isMonitorOrCoordinator;
        });
      }
    });
  }

  closeMenu(): void {
    const menuToggle = document.getElementById('menu-toggle') as HTMLInputElement;
    if (menuToggle) {
      menuToggle.checked = false;
    }
  }


  logout(): void {

    this.confirmModalService.confirm('Cerrar Sesión', '¿Quieres cerrar sesión?')
      .then((confirmed: any) => {
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
      });    
  }
}
