import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  //standalone: true,
  //imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  form = this.formBuilder.group({
    username: '',
    password: ''
  });
  
  message: string = "";
  showMessage: boolean = false;

  constructor(private authService: LoginService, private formBuilder: FormBuilder,) {}

  // onSubmit(): void {
  //   let form = this.form.value;
  //   let username = form.username ?? "";
  //   let password = form.password ?? "";
    

  //   console.log('Submitting login form with username:', username, 'and password:', password);

  //   this.authService
  //     .registerUser(username, password)
  //     .subscribe({
  //       next: (user) => this.onSuccess(),
  //       error: (err) => this.onError(err)
  //     });
  // }

  onSubmit(): void {
    let form = this.form.value;
    let username = form.username ?? "";
    let password = form.password ?? "";
  
    console.log('Submitting login form with username:', username, 'and password:', password);
  
    this.authService
      .registerUser(username, password)
      .subscribe({
        next: (response) => {
          if (response.message) {
            this.onSuccess(response.message);
          } else {
            this.onError('Unknown response from server');
          }
        },
        error: (err) => {
          console.error(err);
          this.onError('Username already exists');
        }
      });
  }
  

  // private onSuccess(): void {
  //   this.message = `Thanks for registering!`;
  //   this.form.reset();
  // }

  // private onError(err: Error) {
  //   if (err.message) {
  //     this.message = err.message;
  //   } else {
  //     this.message = "Unknown error: " + JSON.stringify(err);
  //   }
  // }

  // private onSuccess(responseMessage: string): void {
  //   this.message = responseMessage;
  //   this.form.reset();
  // }
  
  // private onError(errorMessage: string): void {
  //   this.message = errorMessage;
  // }

  private onSuccess(responseMessage: string): void {
    this.message = responseMessage;
    this.showMessage = true;
    this.form.reset();
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // 5 seconds
  }
  
  private onError(errorMessage: string): void {
    this.message = errorMessage;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // 5 seconds
  }


  
  

  
}