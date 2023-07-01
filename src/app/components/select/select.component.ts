import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() options!: Array<{value:string|number, label:string}>;
  @Output() input = new EventEmitter();

  selected!: string;
  open = false;

  ngOnInit() {
    this.selected = this.options[0].label 
    this.input.emit(this.selected);
  }

  onInput(option: {label:string}) {
    this.selected = option.label;
    this.open = !this.open
    this.input.emit(option);
  }
}
