import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input({ required: false }) title!: string
  @Output() searchTerm = new EventEmitter<string>();
  search!: string
  searchCountry() {
    this.searchTerm.emit(this.search);
  }
}
