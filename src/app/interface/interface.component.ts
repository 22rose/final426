import { Component, OnInit } from '@angular/core';
import { journal } from '../../../backend/journal_service.mjs'; // Make sure to import the correct class name

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
  journalEntries: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Load journal entries on component initialization
    this.loadJournalEntries();
  }

  loadJournalEntries() {
    // Call the static method directly on the class
    journal.getAllJournalEntries().then((entries: any[]) => {
      this.journalEntries = entries;
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
