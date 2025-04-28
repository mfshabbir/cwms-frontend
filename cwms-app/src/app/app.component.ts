import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CwtaskListComponent } from './cwtask-list/cwtask-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CwtaskListComponent,RouterModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Case Worker Tasks Management Sysem';
}
