import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe [];
  sub: Subscription;

  constructor(public recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {

    this.recipes = this.recipesService.getRecipes();
    this.sub = this.recipesService.recipeAdded
      .subscribe((recipes) => {
        this.recipes = recipes;
      });

  }

  ngOnInit() {
  }

  onNewRecipeClicked() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
