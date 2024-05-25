import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
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

  userRole: string | null = null;

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.checkAuth().subscribe(response => {
      this.isAuthenticated = response.authenticated;
    });

    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
  }
}
