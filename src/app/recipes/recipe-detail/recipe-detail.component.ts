import {Component, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe;
  id;

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params.id;
        this.selectedRecipe = this.recipesService.getRecipeById(this.id);
      });


  }

  onAddToShoppingList() {
    this.recipesService.addToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditRecipe() {
    // this.router.navigate(['edit', { relativeTo: this.route}])

    // this.router.navigate(['../', this.id, 'edit'])
  }

  onDelete() {
    if (this.selectedRecipe) {
      this.recipesService.removeRecipe(this.id);
    }

    this.router.navigate([''], {relativeTo: this.route});
  }

}
