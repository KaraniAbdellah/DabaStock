import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../services/profile/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})

export class ProfileComponent {
  profile_service = inject(ProfileService);
  // Get This Name Auto
  user_name: string = "abdellah karani";
  avatar:string = `https://robohash.org/${this.user_name}`;
  user_id_iden: string = "102022";
  user_password: String = "ABDELLAh";
  user_email: string = "AHE@gmail.com";

  EditProfile() {
    let new_user: any = {
        user_email: this.user_email,
        user_name: this.user_name,
        user_password: this.user_password
    }
    this.profile_service.EditProfile(this.user_id_iden, new_user).subscribe({
      next: (response) => {
        console.log('User Updated Succeffully:', response);
      },
      error: (err) => {
        console.error('Error Updating User:', err);
      }
    });
  }
  DeleteProfile() {
    this.profile_service.deleteProfile(this.user_id_iden).subscribe({
      next: (response) => {
        console.log('User Deleted Succeffully:', response);
      },
      error: (err) => {
        console.error('Error Deleting User:', err);
      }
    });
  }

}