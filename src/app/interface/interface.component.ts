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
  user: any;
  entries: any[] = [];
  randomJoke: string = '';  
  Id = parseInt(this.loginService.userId, 10);

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
    this.fetchRandomJoke();
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

    this.loginService.getYourId(userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error(error);
      }

    });
  }

  deleteUser(userId: number): void {
    this.loginService.deleteUser(userId).subscribe({
      next: (resp) => {
        // Handle success response if needed
        console.log(resp);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
        // Handle error response if needed
      }
    });
  }
 
  

  //3rd party API
  async fetchRandomJoke() {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
      //https://v2.jokeapi.dev/joke/Any?type=single
      const data = await response.json();

      if (response.ok) {
        if (data.joke) {
          this.randomJoke = data.joke; // Store the random joke in the variable
        } else {
          console.error('No joke available');
        }
      } else {
        console.error('Failed to fetch joke');
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  }


  

}
