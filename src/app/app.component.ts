import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/service/auth.service';
import { LoginComponent } from "./core/components/login/login.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterModule, HeaderComponent, HttpClientModule, LoginComponent, CommonModule]
})
export class AppComponent {
  title = 'GYMUNEAT';
}
