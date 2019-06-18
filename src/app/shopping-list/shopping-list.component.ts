import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingredientAddedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientAddedSub = this.shoppingListService.ingredientAdded
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {

    if (this.ingredientAddedSub) {
      this.ingredientAddedSub.unsubscribe();
    }
  }

  onEditItem(index) {
    this.shoppingListService.startedEditing.next(index);
  }

}
