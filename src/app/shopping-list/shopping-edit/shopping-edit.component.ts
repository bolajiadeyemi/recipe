import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() ingredientAdded: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  onAdd() {
    this.ingredientAdded.emit({name: this.nameInput.nativeElement.value, amount: this.amountInput.nativeElement.value});
  }
}
