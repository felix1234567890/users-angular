import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input({required:true}) title!:string
  @Output() searchTerm = new EventEmitter<string>();
  search(event: Event) {
    this.searchTerm.emit((event.target as HTMLInputElement).value);
  }
}
