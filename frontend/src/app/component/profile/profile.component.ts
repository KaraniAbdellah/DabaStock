import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  user_name: string = "abdellah karani"
  isEdit: boolean = true;

  OnChangeEdit() {
    this.isEdit = !this.isEdit;
  }

  user = {
    name: 'Abdellah Karani',
    avatar: `https://robohash.org/${this.user_name}`,
    email: "abdellahkarani@gmail.com"
  };
}