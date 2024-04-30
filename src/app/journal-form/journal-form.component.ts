import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-form',
  templateUrl: './journal-form.component.html',
  styleUrl: './journal-form.component.css'
})
export class JournalFormComponent implements OnInit {
  journalForm!: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) { 
    
  }

  ngOnInit(): void{
    this.journalForm = this.formBuilder.group({
      title: '',
      content: ''
    });

  }

  onSubmit(): void {
    if (this.journalForm.valid) {
      const userId = parseInt(this.loginService.userId, 10);
      const formData = this.journalForm.value;
      this.loginService.addJournalEntry(userId, formData.title, formData.content).subscribe({
        next: (response) => {
          this.onSuccess()
          console.log('Journal entry submitted successfully:', response);
          this.router.navigate(['/interface']);
        },
        error: (error) => {
          // Handle error response
          console.error('Error submitting journal entry:', error);
        }
      });
    }
  }

  private onSuccess(): void {
    this.journalForm.reset();
    window.alert('submitted successfully')
     // 5 seconds
  }
  
  
}
