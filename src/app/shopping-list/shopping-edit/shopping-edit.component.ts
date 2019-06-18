import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() ingredientAdded: EventEmitter<object> = new EventEmitter<object>();

  recipeForm: FormGroup;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {

    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required])
    });
  }

  onAdd() {
    // this.ingredientAdded.emit({name: this.nameInput.nativeElement.value, amount: this.amountInput.nativeElement.value});
    this.shoppingListService.addIngredient(this.recipeForm.getRawValue());
    this.recipeForm.reset();
  }
}
