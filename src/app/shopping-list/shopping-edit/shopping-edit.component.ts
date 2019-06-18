import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('f') shoppingListForm: NgForm;    /*@ViewChild('...', { static: false}) shoppingListForm: FormGroup;*/
  // @Output() ingredientAdded: EventEmitter<object> = new EventEmitter<object>();

  /*recipeForm: FormGroup;*/
  //ingredient: Ingredient = null;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index) => {
        debugger
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredientById(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });

    /*  this.recipeForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required])
      });*/
  }

  onAdd(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(value, this.editedItemIndex);

    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.clearForm(form);

    /**/
    // this.ingredientAdded.emit({name: this.nameInput.nativeElement.value, amount: this.amountInput.nativeElement.value});
    /* this.recipeForm.reset();*/
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clearForm(form: NgForm) {
    this.editMode = false;
    this.editedItemIndex = null;
    form.resetForm();
  }

  deleteIngredient() {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.clearForm(this.shoppingListForm);
  }
}
