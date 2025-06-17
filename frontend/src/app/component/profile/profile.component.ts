import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../services/profile/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService, AuthService, Router]
})

export class ProfileComponent {
  constructor(private router: Router) {}
  profile_service = inject(ProfileService);
  auth_service = inject(AuthService);
  // Get This Name Auto
  
  user_id_iden: string = `${document.cookie.split('; ').find(c => c?.startsWith('user_id_iden='))?.split('=')[1] || ''}`;
  user_name: string = "john deo";
  avatar:string = `https://robohash.org/deo`;
  user_password: String = "john deo";
  user_email: string = "john_deo@gmail.com";
  ngOnInit() {
    this.auth_service.getUser(this.user_id_iden).subscribe({
      next: (response: any) => {
        this.user_email = response.user_email;
        this.user_password = response.user_password;
        this.user_name = response.user_name;

        this.avatar = `https://robohash.org/${this.user_name}`;
      },
      error: (err) => {
        console.error('Error Found User:', err);
      }
    });
  } 


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
        document.cookie = `user_name=; SameSite=None; Secure; max-age=0`;
        document.cookie = `user_id_iden=; SameSite=None; Secure; max-age=0`;
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Error Deleting User:', err);
      }
    });
  }

}