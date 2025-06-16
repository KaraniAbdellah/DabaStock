import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [AuthService]
})
export class AuthComponent {
  constructor(private router: Router) {}
  isLogin = true;
  IsEmpty = false;
  IsError = false;
  auth_service = inject(AuthService);
  user_email: string = "";
  user_name: string = "";
  user_password: string = "";
  // cookieService = inject(CookieService);

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
  SignInUserOrLogin(event: Event) {
    event.preventDefault();
    if (this.user_email == "" || this.user_password == "") {
      if (!this.isLogin && this.user_name == "") {
          this.IsEmpty = true;
        } else {
          this.IsEmpty = true;
      }
      return;
    } else {
      this.IsEmpty = false;
    }

    let new_user = {
      user_id_iden: `${Math.floor(Math.random() * 10000)}`,
      user_email: this.user_email,
      user_name: this.user_name,
      user_password: this.user_password,
    };
    console.log(new_user);

    if (!this.isLogin) {
      this.auth_service.AddUser_SignIn(new_user).subscribe({
        next: (response) => {
          this.IsError = false;
          document.cookie = `user_name=${new_user.user_name}; SameSite=None; Secure`;
          document.cookie = `user_id_iden=${new_user.user_id_iden}; SameSite=None; Secure`;
          this.isLogin = true;
        },
        error: (err) => {
          this.IsError = true;
          console.error('Error user Added:', err);
        }
      });
    } else {
      this.auth_service.AddUser_Login(new_user).subscribe({
        next: (response) => {
          this.IsError = false;
          this.router.navigate(["/"]);
        },
        error: (err) => {
          this.IsError = true;
          console.error('Error user Login:', err);
        }
      });
    }
  }
}
