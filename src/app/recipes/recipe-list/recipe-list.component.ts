import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe [];

  constructor(public recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {

    this.recipes = this.recipesService.getRecipes();

  }

  ngOnInit() {
  }

  onNewRecipeClicked() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
