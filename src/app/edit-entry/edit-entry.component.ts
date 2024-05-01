import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrl: './edit-entry.component.css'
})
export class EditEntryComponent implements OnInit {
  entryForm!: FormGroup;
  entryId!: number;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.entryForm = this.formBuilder.group({
  //     title: '',
  //     content: ''
  //   });

  //   // Get entryId from route parameters
  //   this.entryId = +this.route.snapshot.paramMap.get('entryId')!;
  //   console.log('Entry ID:', this.entryId);

  //   // Call your service to retrieve the entry details
  //   this.loginService.getEntry(this.entryId).subscribe({
      
  //     next: (data) => {
  //       // Populate form fields with retrieved data
  //       console.log('Retrieved entry:', data);
  //       this.entryForm.patchValue({
  //         title: data?.title,
  //         content: data?.content,
  //       });
  //       console.log('Patched title:', this.entryForm.get('title')?.value);
  //       console.log('Patched content:', this.entryForm.get('content')?.value);
        
  //     },
  //     error: (error) => {
  //       console.error('Error retrieving entry:', error);
  //       // Handle error
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.entryForm = this.formBuilder.group({
      title: '',
      content: ''
    });
  
    // Get entryId from route parameters
    this.entryId = +this.route.snapshot.paramMap.get('entryId')!;
    console.log('Entry ID:', this.entryId);
  
    // Call your service to retrieve the entry details
    this.loginService.getEntry(this.entryId).subscribe({
      next: (data) => {
        // Check if data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
          // Retrieve the first element of the array
          const entry = data[0];
          // Populate form fields with retrieved data
          console.log('Retrieved entry:', entry);
          this.entryForm.patchValue({
            title: entry.title,
            content: entry.content,
          });
          console.log('Patched title:', this.entryForm.get('title')?.value);
          console.log('Patched content:', this.entryForm.get('content')?.value);
        } else {
          console.error('Error: No entry data found');
        }
      },
      error: (error) => {
        console.error('Error retrieving entry:', error);
        // Handle error
      }
    });
  }
  

  onSubmit(): void {
    if (this.entryForm.valid) {
      const formData = this.entryForm.value;
      this.loginService.editEntry(this.entryId, formData.title, formData.content).subscribe({
        next: (response) => {
          this.onSuccess();
          console.log('Journal entry submitted successfully:', response);
          this.router.navigate(['/interface']);
        },
        error: (error) => {
          // Handle error response
          console.error('Error updating journal entry:', error);
        }
      });
    }
  }

  private onSuccess(): void {
    this.entryForm.reset();
    window.alert('Edited successfully');
  }
}
