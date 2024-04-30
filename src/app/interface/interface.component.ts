import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  
  entries: any[] = [];
  

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { 
    
  }

  

  ngOnInit(): void {
    const userId = parseInt(this.loginService.userId, 10);
    console.log('User ID:', userId);

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
