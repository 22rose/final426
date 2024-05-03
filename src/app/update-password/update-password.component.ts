import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  passwordForm!: FormGroup

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
   
   }


  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      username: '',
      oldPassword: '',
      newPassword: ''
    });
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      this.loginService.updatePassword(formData.username, formData.oldPassword, formData.newPassword).subscribe({
        next: (response) => {
          this.onSuccess()
          console.log('Password updated successfully:', response);
          this.router.navigate(['/interface']);
        },
        error: (error) => {
          // Handle error response
          console.error('Error submitting password change:', error);
        }
      });
    }
  }


    private onSuccess(): void {
      this.passwordForm.reset();
      window.alert('Password updated successfully');
    }

  }


  



