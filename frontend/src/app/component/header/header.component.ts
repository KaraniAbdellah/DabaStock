import { Component, OnInit, OnDestroy, signal, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuItems = [
    { title: 'Profile', icon: 'person', route: '/profile', class: 'text-blue-400' },
    { title: 'Log out', icon: 'logout', route: '/auth', class: 'text-red-400' }
  ];
  
  showDropdown = signal(false);
  username = signal('Ahmed');

  constructor() {
    console.log("Header component initialized");
  }

  ngOnInit() {
    // Component initialization logic
  }

  ngOnDestroy() {
    // Clean up any subscriptions or event listeners
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Check if click was outside dropdown and not on the toggle button
    if (!target.closest('.dropdown-container') && !target.closest('.dropdown-toggle')) {
      this.showDropdown.set(false);
    }
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent document click from immediately closing dropdown
    this.showDropdown.set(!this.showDropdown());
  }
}