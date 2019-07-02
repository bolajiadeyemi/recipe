import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;
  imagePath = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.id = params.id;
        this.editMode = true;
      } else {
        this.id = null;
        this.editMode = false;
      }

      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let imagePath = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(+this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      imagePath = recipe.imagePath;
      this.imagePath = recipe.imagePath;

      if (recipe.ingredients) {
        recipe.ingredients.forEach(ig => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ig.name),
              amount: new FormControl(ig.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    /*   const newRecipe = new Recipe(
         this.recipeForm.value.name,
         this.recipeForm.value.description,
         this.recipeForm.value.imagePath,
         this.recipeForm.value.ingredients,
       );*/
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    // this.router.navigate(['/'], { relativeTo: this.route});
    this.onCancel();
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  deleteIngredient(i) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
    //(<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onCancel() {
    this.recipeForm.reset();
    // this.router.navigate([`/recipes/0`]);
    this.router.navigate([`../`, { relativeTo: this.route }]);
  }
}
