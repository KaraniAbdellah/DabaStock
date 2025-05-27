import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AsideComponent } from '../../component/aside/aside.component';
import { HeaderComponent } from '../../component/header/header.component';


@Component({
  selector: 'app-home',
  imports: [RouterModule, RouterOutlet, HeaderComponent, AsideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
