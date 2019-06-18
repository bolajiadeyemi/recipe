import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipesService} from './recipes.service';
import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
    /*   this.selectedRecipeSub = this.recipesService.getSelectedRecipe()
         .subscribe((selectedRecipe) => {
           this.selectedRecipe = selectedRecipe;
         });*/
  /*  this.recipesService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });*/


  }
}
