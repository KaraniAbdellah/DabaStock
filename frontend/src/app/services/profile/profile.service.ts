import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(private http: HttpClient) { }
  
  url: string = "http://127.0.0.1:8080/user";
  EditProfile(user_id_iden: string, user: any) {
    return this.http.put(`${this.url}/updateUser/${user_id_iden}`, user);
  }

  deleteProfile(user_id_iden: string) {
    return this.http.delete(`${this.url}/deleteUser/${user_id_iden}`);
  }

}
