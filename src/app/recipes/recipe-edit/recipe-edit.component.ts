import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';

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

  constructor(private route: ActivatedRoute, private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.initForm();
    this.route.params
      .subscribe((params: Params) => {
        this.id = params.id;
        this.editMode = params.id !== null;
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
        recipe.ingredients.forEach((ig) => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ig.name),
              amount: new FormControl(ig.amount)
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
    console.log(this.recipeForm);
  }

  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

}
