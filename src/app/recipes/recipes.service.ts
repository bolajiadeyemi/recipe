import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe [] = [new Recipe('A test Recipe', 'This is simply a test',
    'https://www.telegraph.co.uk/content/dam' +
    '/food-and-drink/2019/05/10/fish_trans_NvBQzQNjv4BqEDjTm7JpzhSGR1_8ApEWQA1vLvhkMtVb21dMmpQBfEs.jpg?imwidth=1400', [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ])];

  private selectedRecipe: Subject<Recipe>;
  recipeSelected = new EventEmitter<Recipe>();


  constructor( private shoppingListService: ShoppingListService) {
    this.selectedRecipe = new Subject();
  }

  getRecipes(): Recipe [] {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addMultipleIngredient(ingredients);
  }

  setSelectedRecipe(recipe: Recipe) {
    // this.selectedRecipe.next(recipe);
    this.recipeSelected.emit(recipe);

  }

/*  getSelectedRecipe() {
    return this.selectedRecipe.asObservable();
  }*/
}
