import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {RecipesService} from '../recipes/recipes.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipesService) {

  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://github-fight-6a33a.firebaseio.com/recipes.json').pipe(map((recipes: []) => {
      return recipes.map((recipe: any) => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));

  }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put('https://github-fight-6a33a.firebaseio.com/recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
