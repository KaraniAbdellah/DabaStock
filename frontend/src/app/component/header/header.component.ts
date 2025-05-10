import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // Variable Declaration
  down_eles = [
    { title: 'Log out', icon: 'logout' },
    { title: 'Profile', icon: 'person' },
  ];
  dropDown = signal(false);


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

  constructor() {}
}
