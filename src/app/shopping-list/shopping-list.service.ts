import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {
  }


  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addMultipleIngredient(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    // this.ingredients = this.ingredients.concat(ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
