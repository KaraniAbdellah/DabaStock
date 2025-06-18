import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-aside',
  imports: [RouterModule, MatIconModule, CommonModule],
templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
  providers: [Router]
})
export class AsideComponent {
  constructor(private router: Router) {}

  isActive(router: string): boolean {
    return this.router.url == `/${router}`;
  }

  navigateToAnotherCom(path: string) {
    this.router.navigate([`/${path}`]);
  }

  // Log out
  logout() {
    document.cookie = `user_name=; SameSite=None; Secure; max-age=0`;
    document.cookie = `user_id_iden=; SameSite=None; Secure; max-age=0`;
    this.router.navigate(["/loading"]);
    setTimeout(() => {
      this.router.navigate(["/auth"]);
    }, 2000);
  }
}
