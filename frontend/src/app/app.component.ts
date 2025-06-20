import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  providers: [AuthService, Router]
})
export class AppComponent {
  title = 'DabaStock';
  auth_service = inject(AuthService);
  constructor(private router: Router) {}

  ngOnInit() {
    // Check If User Login or No
    const user_id_iden: string =  `${document.cookie.split('; ').find(c => c?.startsWith('user_id_iden='))?.split('=')[1] || ''}`;
    if (user_id_iden.trim() !== "") {
      this.auth_service.getUser(user_id_iden).subscribe({
        next: (response: any) => {
          console.log("This User Already Login");
          this.router.navigate(["/dashboard"]);
        },
        error: (err) => {
          this.router.navigate(["/auth"]);
          console.error('Error Geting user:', err);
        }
      });
    } else {
      this.router.navigate(["/auth"]);
    }
  }

}
