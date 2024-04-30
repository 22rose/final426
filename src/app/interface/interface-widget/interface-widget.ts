import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './interface-widget.html',
  styleUrls: ['./interface-widget.css']
})
export class JournalEntryComponent {
  @Input() entry: any;

  editEntry() {
    // Implement edit functionality
  }

  deleteEntry() {
    // Implement delete functionality
  }
}
