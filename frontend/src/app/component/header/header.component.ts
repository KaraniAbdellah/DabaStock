import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule, } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  down_eles = [{title: "Log out", icon: "logout"}, {title: "Profile", icon: "person"}];

  set_show_model() {
    this.show_model.update((value: Boolean) => value = !value)
  }
  show_model = signal(false)
  constructor() { }
}

