import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-aside',
  imports: [RouterModule, MatIconModule],
templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  
}
