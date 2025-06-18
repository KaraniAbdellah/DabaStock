import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent {
  constructor(private router: Router) {}
  // Variable Declaration
  down_eles = [
    { title: 'Log out', icon: 'logout' },
    { title: 'Profile', icon: 'person' },
  ];
  dropDown = signal(false);
  user_name: string = `${document.cookie.split('; ').find(c => c?.startsWith('user_name='))?.split('=')[1] || ''}`;

  // Log out
  logout() {
    document.cookie = `user_name=; SameSite=None; Secure; max-age=0`;
    document.cookie = `user_id_iden=; SameSite=None; Secure; max-age=0`;
    this.router.navigate(["/loading"]);
    setTimeout(() => {
      console.log("We Must in Auth after 2 second");
      this.router.navigate(["/auth"]);
    }, 2000);
  }


  // Handle The Drop Down Feature
  @ViewChild('dropdown_btn') button?: ElementRef;
  @HostListener('document:click', ['$event'])
  showDropDown($event: Event) {
    // if ($event.target == this.button?.nativeElement) { --> event delegation issue
    if (this.button?.nativeElement.contains($event.target) as Node) {
      this.dropDown.update((value: Boolean) => (value = !value));
    } else {
      this.dropDown.update((value: Boolean) => false);
    }
  }

}
