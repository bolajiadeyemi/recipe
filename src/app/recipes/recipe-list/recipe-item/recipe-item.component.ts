import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipesService} from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: { name: string, description: string, imagePath: string, ingredients: [] };
  @Output() recipeSelected: EventEmitter<object> = new EventEmitter<object>();

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
  }

  onRecipeClicked() {
    //this.recipesService.setSelectedRecipe(recipe);
    this.recipesService.recipeSelected.emit(this.recipe);
  }

}
