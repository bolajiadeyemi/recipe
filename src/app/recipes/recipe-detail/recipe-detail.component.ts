import {Component, Input, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() selectedRecipe;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
  }

  onAddToShoppingList() {
    this.recipesService.addToShoppingList(this.selectedRecipe.ingredients);
  }

}
