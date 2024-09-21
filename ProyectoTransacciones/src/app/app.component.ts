import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  providers: [CookieService],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoTransacciones';
}
