import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter();
  recipes: Recipe [] = [new Recipe('A test Recipe', 'This is simply a test',
    'https://www.telegraph.co.uk/content/dam' +
    '/food-and-drink/2019/05/10/fish_trans_NvBQzQNjv4BqEDjTm7JpzhSGR1_8ApEWQA1vLvhkMtVb21dMmpQBfEs.jpg?imwidth=1400')];

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeSelected(selectedRecipe) {
    this.recipeSelected.emit(selectedRecipe);

  }

}
