import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // Define Function That Lets user login and signin

  url: string = `http://127.0.0.1:8080`;
  AddUser_SignIn(user: any) {
    return this.http.post(`${this.url}/signin/add_user`, user);
  }

  AddUser_Login(user: any) {
    return this.http.post(`${this.url}/login/getUserByLogin`, user);
  }

  getUser(user_id_iden: string) {
    return this.http.get(`${this.url}/user/getUser/${user_id_iden}`);
  }
}
