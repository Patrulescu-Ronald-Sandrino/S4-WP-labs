import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logIn(usernameInput: HTMLInputElement): void {
    const username = usernameInput.value;
    if (username == "") {
      alert("Username must not be empty!");
    }
    else {
      this.authService.logIn(username);

      const logInSuccess: boolean = true; // this.authService.getUsername() == username;
      if (logInSuccess) {
        // TODO: redirect to main page
        alert("Logged in");
      }
      else {
        alert('Failed to log in');
      }
    }
  }
}
