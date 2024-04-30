import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrl: './interface.component.css'
})
export class InterfaceComponent implements OnInit {
   
  // form = this.formBuilder.group({
  //   title: '',
  //   content: ''
  // });
  //journalForm!: FormGroup;
  entries: any[] = [];
  

  constructor(private loginService: LoginService,private router: Router) { 
    
  }

  createJournalForm(): void {
    // this.journalForm = this.formBuilder.group({
    //   title: '',
    //   content: ''
    // });
    this.router.navigate(['/journal-form']);
  }

  // onSubmit(): void {
  //   if (this.journalForm.valid) {
  //     const userId = parseInt(this.loginService.userId, 10);
  //     const formData = this.journalForm.value;
  //     this.loginService.addJournalEntry(userId, formData.title, formData.content).subscribe({
  //       next: (response) => {
  //         // Handle success response
  //         console.log('Journal entry submitted successfully:', response);
  //       },
  //       error: (error) => {
  //         // Handle error response
  //         console.error('Error submitting journal entry:', error);
  //       }
  //     });
  //   }
  // }

  

  ngOnInit(): void {
    const userId = parseInt(this.loginService.userId, 10);
    console.log('User ID:', userId);

    // const userSessionId = localStorage.getItem('userId');
    // if (!userSessionId) {
    //   this.router.navigate(['']); // Redirect to login if no user ID found
    // }
    // Call the service method to get journal entries
    this.loginService.getJournalEntries(userId).subscribe({
      next: (data) => {
        this.entries = data;
        // Do something with the journal entries
      },
      error: (error) => {
        console.error(error);
        // Handle error
      }
    });
  }
  

}
