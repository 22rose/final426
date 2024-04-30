import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { NavigationExtras } from '@angular/router';


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
  registerForm: FormGroup;
  loginForm: FormGroup;
  //router: any;
 

  constructor(private authService: LoginService, private formBuilder: FormBuilder,  private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: '',
      password: ''
    });

    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

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

  onRegister(): void {
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

  onLogin(): void {
    let form = this.loginForm.value;
    let username = form.username ?? "";
    let password = form.password ?? "";

    console.log('Submitting login form with username:', username, 'and password:', password);

    this.authService.loginUser(username, password).subscribe({
      next: (response) => {
        if (response.message) {
          if (response.message && response.message === 'User logged in successfully') {
            this.authService.userId = response.userId;
            this.onSuccess(response.message)
            //localStorage.setItem('userId', response.userId); 
            this.router.navigate(['/interface']);

          }
          //this.onSuccess(response.message)
            
          
          // Navigate to the main interface page upon successful login
          // Assuming the route name is 'interface'
          //this.router.navigate(['/interface']);
        } else {
          this.onError('Unknown response from server');
        }
      },
      error: (err) => {
        console.error(err);
        this.onError('Invalid username or password');
      }
    });
  }

  

 
  

  private onSuccess(responseMessage: string): void {
    this.message = responseMessage;
    this.showMessage = true;
    this.form.reset();
    setTimeout(() => {
      this.showMessage = false;
    }, 5000); // 5 seconds
  }
  
  private onError(errorMessage: string): void {
    this.message = errorMessage;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000); // 5 seconds
  }
}