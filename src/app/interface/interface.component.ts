// import { Component, OnInit } from '@angular/core';
// import { LoginService } from '../login.service';

// @Component({
//   selector: 'app-interface',
//   templateUrl: './interface.component.html',
//   styleUrl: './interface.component.css'
// })
// export class InterfaceComponent implements OnInit {
//   entries: any[] = [];

//   constructor(private loginService: LoginService) { }

//   ngOnInit(): void {
//     // Call the service method to get journal entries
//     this.loginService.getJournalEntries().subscribe({
//       next: (data) => {
//         this.entries = data;
//         // Do something with the journal entries
//       },
//       error: (error) => {
//         console.error(error);
//         // Handle error
//       }
//     });
//   }

// }
