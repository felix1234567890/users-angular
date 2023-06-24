import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input({required:true}) pageCount!: number;
  @Input({required:true}) pageNumber!: number;
  @Output() increaseNumber = new EventEmitter<void>();
  @Output() decreaseNumber = new EventEmitter<void>();
}
