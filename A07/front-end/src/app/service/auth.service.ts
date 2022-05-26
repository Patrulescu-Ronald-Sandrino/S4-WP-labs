import { Injectable } from '@angular/core';
import BACKEND_BASE_URL from "../env";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendURL = BACKEND_BASE_URL + "session.php";

  constructor(private http: HttpClient) { }

  logIn(username: string): void {
    // angular post form data https://remotestack.io/post-multipart-form-data-in-angular-with-httpclient/
    const formData: any = new FormData();

    formData.append('action', 'login');
    formData.append('data',  username);

    // const loginResult = this.http.post(this.backendURL, {data: username});
    this.http.post(this.backendURL, formData).subscribe(value => {
      console.log('post login subscribe value =', value);
    });
  }

  getUsername(): string {
    const username = ""; // TODO
    return username;
  }

  logOut(): void {
    // TODO
  }
}
