import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {
  }


  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredientById(index: number): Ingredient {
    return this.ingredients[index];
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

  updateIngredient(updatedIngredient, ingredientIndex) {
    this.ingredients[ingredientIndex] = updatedIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index) {
    this.ingredients = this.ingredients.filter((ing, i) => index !== i);

    console.log(this.ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

}
