import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AsideComponent } from './component/aside/aside.component';
import { HeaderComponent } from './component/header/header.component';


@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, HeaderComponent, AsideComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'DabaStock';
}

